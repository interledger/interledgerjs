# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.3-alpha.2](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.2.3-alpha.1...ilp-spsp-payout@1.2.3-alpha.2) (2022-08-18)

**Note:** Version bump only for package ilp-spsp-payout





## [1.2.3-alpha.1](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.2.3-alpha.0...ilp-spsp-payout@1.2.3-alpha.1) (2022-05-04)

**Note:** Version bump only for package ilp-spsp-payout





## [1.2.3-alpha.0](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.2.2...ilp-spsp-payout@1.2.3-alpha.0) (2022-04-27)


### Bug Fixes

* fixing eslint issues ([6093679](https://github.com/interledgerjs/interledgerjs/commit/6093679060d9f27911e2fd3f0dbbf15ebae6f538))


### BREAKING CHANGES

* Add `isConnected` property to the Plugin interface in ilp-plugin. This property should have already been there and most plugins are likely to implement it because it is required in other contexts. For example, ilp-protocol-stream requires it.





## [1.2.2](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.2.1...ilp-spsp-payout@1.2.2) (2021-10-07)

**Note:** Version bump only for package ilp-spsp-payout

## [1.2.1](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.2.0...ilp-spsp-payout@1.2.1) (2021-02-04)

**Note:** Version bump only for package ilp-spsp-payout

# [1.2.0](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.1.7...ilp-spsp-payout@1.2.0) (2020-08-21)

### Bug Fixes

- **spsp-payout:** add tests and logging ([cbc8f29](https://github.com/interledgerjs/interledgerjs/commit/cbc8f29e4220d1e19d319ac7ebb57b85a4f73876))

### Features

- **spsp-payout:** fix another memory leak ([2074b38](https://github.com/interledgerjs/interledgerjs/commit/2074b38842ad0fcb149aa2edc441fb30daa68308))

## [1.1.7](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.1.6...ilp-spsp-payout@1.1.7) (2020-08-14)

### Bug Fixes

- **spsp-payout:** memory leak on send() error ([ec797cb](https://github.com/interledgerjs/interledgerjs/commit/ec797cb7cfea649f158637ad4393fa5da3fc7be3))

## [1.1.6](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.1.5...ilp-spsp-payout@1.1.6) (2020-07-27)

**Note:** Version bump only for package ilp-spsp-payout

## [1.1.5](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.1.4...ilp-spsp-payout@1.1.5) (2020-07-27)

**Note:** Version bump only for package ilp-spsp-payout

## [1.1.4](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.1.3...ilp-spsp-payout@1.1.4) (2020-07-24)

**Note:** Version bump only for package ilp-spsp-payout

## [1.1.3](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.1.2...ilp-spsp-payout@1.1.3) (2020-06-29)

### Features

- **pay:** open payments support ([2d4ba19](https://github.com/interledgerjs/interledgerjs/commit/2d4ba19275b444e46845a9114537b624d939f5ae))
- STREAM payment library alpha, ci updates ([#17](https://github.com/interledgerjs/interledgerjs/issues/17)) ([4e128bc](https://github.com/interledgerjs/interledgerjs/commit/4e128bcee372144c1324a73e8b51223a0b133f2e))

## [1.1.2](https://github.com/interledgerjs/interledgerjs/compare/ilp-spsp-payout@1.1.1...ilp-spsp-payout@1.1.2) (2019-12-03)

**Note:** Version bump only for package ilp-spsp-payout

# 1.1.0 (2019-11-08)

### Bug Fixes

- add argument to create plugin for spsp-payout ([06b52dc](https://github.com/interledgerjs/interledgerjs/commit/06b52dc))
- export Plugin type from ilp-plugin ([03b993a](https://github.com/interledgerjs/interledgerjs/commit/03b993a))
- merge with branch ([b192809](https://github.com/interledgerjs/interledgerjs/commit/b192809))
- minor fixes ([e3eec70](https://github.com/interledgerjs/interledgerjs/commit/e3eec70))
- tests ([eab423a](https://github.com/interledgerjs/interledgerjs/commit/eab423a))

### Features

- add spsp-payout to interledgerjs ([f4e33b6](https://github.com/interledgerjs/interledgerjs/commit/f4e33b6))
