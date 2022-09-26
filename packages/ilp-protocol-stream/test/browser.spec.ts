// This file uses Puppeteer+Webpack to build & test the browser version of
// ilp-protocol-stream. The main point is to exercise `src/util/crypto-browser`,
// since every thing else is the same as in Node.

import assert from 'assert'
import * as path from 'path'
import puppeteer from 'puppeteer'
import webpack from 'webpack'
import PluginMiniAccounts from 'ilp-plugin-mini-accounts'
import { createServer, Connection } from '../src'
import webpackConfig from './browser/webpack.config'
import MagicalWindow from './browser/magical-window-interface'

const BTP_SERVER_OPTS = {
  port: 9000,
  allowedOrigins: ['.*'],
  debugHostIldcpInfo: {
    clientAddress: 'test.example',
    assetScale: 9,
    assetCode: '___',
  },
}

declare const window: MagicalWindow

describe('Puppeteer', function () {
  before(async function () {
    // Webpack can take >2s.
    this.timeout(1e4)
    await buildClientBundle()
    this.browser = await puppeteer.launch()
  })

  after(async function () {
    await this.browser.close()
  })

  beforeEach('Set up server', async function () {
    this.serverPlugin = new PluginMiniAccounts(BTP_SERVER_OPTS)
    this.server = await createServer({ plugin: this.serverPlugin })
    this.server.on('connection', (connection: Connection) => {
      this.serverConnection = connection
      connection.on('stream', (stream) => {
        stream.setReceiveMax(10000)
      })
    })
  })

  beforeEach('Set up client', async function () {
    this.timeout(1e4)
    this.page = await this.browser.newPage()
    this.page.on('error', (err: Error) => {
      console.log('puppeteer_error:', err.stack)
    })
    this.page.on('console', (message: puppeteer.ConsoleMessage) => {
      console.log('puppeteer:', message.text())
    })
    this.page.on('close', () => console.log('puppeteer_close'))
    this.page.on('dialog', (dialog: puppeteer.Dialog) => console.log('puppeteer_dialog', dialog))
    this.page.on('pageerror', (err: Error) => console.log('puppeteer_pageerror', err))

    // Navigate to a dummy page so that `window.crypto.subtle` is available.
    // See: https://github.com/GoogleChrome/puppeteer/issues/2301#issuecomment-379622459
    await this.page.goto('file:///dev/null')
    await this.page.addScriptTag({
      path: path.resolve(__dirname, '../dist/test/browser/bundle.js'),
    })

    const { destinationAccount, sharedSecret } = this.server.generateAddressAndSecret()
    await this.page.evaluate(
      async (opts: { port: number; destinationAccount: string; sharedSecret: string }) => {
        try {
          window['streamClient'] = await window['makeStreamClient'](
            {
              server: 'btp+ws://127.0.0.1:' + opts.port,
              btpToken: 'secret',
            },
            opts
          )
        } catch (err) {
          console.error('uncaught error:', err)
          throw err
        }
      },
      {
        port: BTP_SERVER_OPTS.port,
        destinationAccount,
        sharedSecret: sharedSecret.toString('base64'),
      }
    )
  })

  afterEach('Tear down client & server', async function () {
    await this.page.evaluate(async function () {
      await window.streamClient!.end()
    })
    await this.serverConnection.destroy()
    await this.server.close()
  })

  describe('stream money', function () {
    it('sends money', async function () {
      await this.page.evaluate(async function () {
        if (window.streamClient) {
          const stream = window.streamClient.createStream()
          await stream.sendTotal(100)
        }
      })
      assert.equal(this.serverConnection.totalReceived, '100')
    })
  })

  // This test runner is pretty clumsy/fragile.
  describe('crypto helpers (browser)', function () {
    it('passes', async function () {
      await this.page.evaluate(async function () {
        const tests: any[] = []
        // TODO: This could be typed more strongly but don't want to figure it out for mocha
        // since I think we should switch to jest anyways
        window.runCryptoTests({
          describe: function (label: any, run: any) {
            run()
          },
          it: function (label: any, run: any) {
            tests.push(run())
          },
        } as any)
        await Promise.all(tests)
      })
    })
  })
})

function buildClientBundle() {
  return new Promise<void>((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
      } else if (stats && stats.hasErrors()) {
        reject(stats.compilation.errors[0])
      } else {
        resolve()
      }
    })
  })
}
