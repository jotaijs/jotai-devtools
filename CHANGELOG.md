## [0.5.1](https://github.com/jotaijs/jotai-devtools/compare/v0.5.0...v0.5.1) (2023-04-30)

### Bug Fixes

- add mts types after compile
  ([#66](https://github.com/jotaijs/jotai-devtools/issues/66))
  ([15b770e](https://github.com/jotaijs/jotai-devtools/commit/15b770eb8e00b210d7fae2b9d5af53087252b738))

# [0.5.0](https://github.com/jotaijs/jotai-devtools/compare/v0.4.0...v0.5.0) (2023-04-30)

### Bug Fixes

- generate esm modules with process.env.NODE_ENV
  ([#60](https://github.com/jotaijs/jotai-devtools/issues/60))
  ([0d07f94](https://github.com/jotaijs/jotai-devtools/commit/0d07f9440814a04ff41a7471459bfb50ce0178db))

### Features

- add json tree viewer
  ([#62](https://github.com/jotaijs/jotai-devtools/issues/62))
  ([fb9453f](https://github.com/jotaijs/jotai-devtools/commit/fb9453fa1657f6357c236001c7977de7c2f4fa79))
- use javascript value stringifier
  ([#61](https://github.com/jotaijs/jotai-devtools/issues/61))
  ([9fdea17](https://github.com/jotaijs/jotai-devtools/commit/9fdea173b91056e573bba4ceabe1db091bf2b121))

# [0.4.0](https://github.com/jotaijs/jotai-devtools/compare/v0.3.1...v0.4.0) (2023-03-29)

### Bug Fixes

- move @emotion/react to peer dependency
  ([#42](https://github.com/jotaijs/jotai-devtools/issues/42))
  ([b4cdb50](https://github.com/jotaijs/jotai-devtools/commit/b4cdb50e9751cec092d6192a059d1b10e0819d89))
- prevent adding padding to body
  ([#51](https://github.com/jotaijs/jotai-devtools/issues/51))
  ([98b34fe](https://github.com/jotaijs/jotai-devtools/commit/98b34feaa1eed75518d14d1e6f82667c32318e8b))

### Features

- cache user-set shell height for optimal UX
  ([#43](https://github.com/jotaijs/jotai-devtools/issues/43))
  ([a2d5ea6](https://github.com/jotaijs/jotai-devtools/commit/a2d5ea6211c4d2bf316f8dcbd59dc463eeaa4a94))

## [0.3.1](https://github.com/jotaijs/jotai-devtools/compare/v0.3.0...v0.3.1) (2023-03-12)

### Bug Fixes

- ShellTriggerButton icon disappears
  [#34](https://github.com/jotaijs/jotai-devtools/issues/34)
  ([#35](https://github.com/jotaijs/jotai-devtools/issues/35))
  ([8f800ce](https://github.com/jotaijs/jotai-devtools/commit/8f800ce1b3f43cc87a7a9474fb9e1ade943b6f22))

# [0.3.0](https://github.com/jotaijs/jotai-devtools/compare/v0.3.0-next.4...v0.3.0) (2023-03-06)

### Bug Fixes

- improve atom list stability + remove deep parse feature
  ([fe82bfe](https://github.com/jotaijs/jotai-devtools/commit/fe82bfe4e5d1b69366bc8ca4f5f1f612a32209e1))

# [0.3.0-next.4](https://github.com/jotai-labs/jotai-devtools/compare/v0.3.0-next.3...v0.3.0-next.4) (2023-03-02)

### Bug Fixes

- bundle in fonts for better stability
  ([236cd75](https://github.com/jotai-labs/jotai-devtools/commit/236cd75c82add160635b0ded2fa2e0bfadc60e71))
- fonts css
  ([be8c16c](https://github.com/jotai-labs/jotai-devtools/commit/be8c16ccab78a0b9153b2a6c655d4f840547c73c))
- use JetBrains mono fonts on NavLink
  ([68cbe5a](https://github.com/jotai-labs/jotai-devtools/commit/68cbe5a4427ed1b5ea1bb968c1554a50f5ce1127))

### Features

- add option to display private atoms
  ([d1875ee](https://github.com/jotai-labs/jotai-devtools/commit/d1875ee58ca2faa49512e30d1efc17f10b93de3b))

# [0.3.0-next.3](https://github.com/jotai-labs/jotai-devtools/compare/v0.3.0-next.2...v0.3.0-next.3) (2023-02-17)

### Bug Fixes

- infer options type from Jotai
  ([8ddad63](https://github.com/jotai-labs/jotai-devtools/commit/8ddad63821ce825b8871a14e7a6cc37eb2c93622))
- use exactOptionalPropertyTypes
  ([6c9cbdf](https://github.com/jotai-labs/jotai-devtools/commit/6c9cbdffa020e9f15e1e0198d18eefae0b2e4f28))

### Features

- add custom style nonce + remove global normalized styles
  ([10d3c4a](https://github.com/jotai-labs/jotai-devtools/commit/10d3c4a93494bd27fc16d1607cc42ea3f2e00ae4))

# [0.3.0-next.2](https://github.com/jotai-labs/jotai-devtools/compare/v0.3.0-next.1...v0.3.0-next.2) (2023-02-12)

### Features

- add error boundary
  ([5667a05](https://github.com/jotai-labs/jotai-devtools/commit/5667a059da325ee8d0452e5d097d4eb14ab97c5e))

# [0.3.0-next.1](https://github.com/jotai-labs/jotai-devtools/compare/v0.3.0-next.0...v0.3.0-next.1) (2023-02-10)

### Bug Fixes

- handle atom containing undefined values
  ([c086a75](https://github.com/jotai-labs/jotai-devtools/commit/c086a75ed92066c78a3d42f5b3e5b924576bbee5))
- inject react shim to the build
  ([a20a235](https://github.com/jotai-labs/jotai-devtools/commit/a20a2355b08193fc4f8cde6dec85602ead7229df))

### Features

- make raw and parse value copyable
  ([5348337](https://github.com/jotai-labs/jotai-devtools/commit/5348337530177f8db80e53d0d35e339cd78ad84c))

# [0.3.0-next.0](https://github.com/jotai-labs/jotai-devtools/compare/v0.2.0...v0.3.0-next.0) (2023-02-07)

### Features

- **ui-devtools:** initial commit
  ([7c38133](https://github.com/jotai-labs/jotai-devtools/commit/7c38133a360c0c97db6406becdc1bf939e1001e7))

# [0.2.0](https://github.com/jotai-labs/jotai-devtools/compare/v0.2.0-next.1...v0.2.0) (2023-02-01)

# [0.2.0-next.1](https://github.com/jotai-labs/jotai-devtools/compare/v0.2.0-next.0...v0.2.0-next.1) (2023-01-17)

### Bug Fixes

- order of typescript types
  ([#21](https://github.com/jotai-labs/jotai-devtools/issues/21))
  ([f2bd855](https://github.com/jotai-labs/jotai-devtools/commit/f2bd85562c4db09caab071f8f7a6db177aae2487))

# [0.2.0-next.0](https://github.com/jotai-labs/jotai-devtools/compare/v0.2...v0.2.0-next.0) (2023-01-16)

### Bug Fixes

- **utils:** pass options through base hooks
  ([#17](https://github.com/jotai-labs/jotai-devtools/issues/17))
  ([d129ea6](https://github.com/jotai-labs/jotai-devtools/commit/d129ea693ae5a5f649081195ad7940aa0e0218be))
- **utils:** types for /utils entry point
  ([#18](https://github.com/jotai-labs/jotai-devtools/issues/18))
  ([743d984](https://github.com/jotai-labs/jotai-devtools/commit/743d984bcb78e8c6eeaecd2e9f15f3cba3215c45))

# Changelog

## [0.2.0-Alpha.0](https://github.com/jotai-labs/jotai-devtools/compare/v0.1.0...v0.2.0-Alpha.0) (2023-01-14)

### Features

- add support for Jotai V2 API
  ([#14](https://github.com/jotai-labs/jotai-devtools/issues/14))
  ([53e12d8](https://github.com/jotai-labs/jotai-devtools/commit/53e12d840ed5964f302c471354aa58a0016a85cd))

### Miscellaneous Chores

- release 0.2.0-Alpha.0
  ([3a6e8a9](https://github.com/jotai-labs/jotai-devtools/commit/3a6e8a9b910b0f980a946c5d4cb390b23443ecf9))

## [0.1.0](https://github.com/jotai-labs/jotai-devtools/compare/v0.0.1-alpha.0...v0.1.0) (2023-01-10)

### Miscellaneous Chores

- release 0.1.0
  ([28ce7d1](https://github.com/jotai-labs/jotai-devtools/commit/28ce7d1b83af442298147668a45751f1f4b058ea))

## [0.0.1-alpha.0](https://github.com/jotai-labs/jotai-devtools/compare/v0.0.1-alpha...v0.0.1-alpha.0) (2023-01-10)

### Miscellaneous Chores

- release 0.0.1-alpha.0
  ([8bf9f12](https://github.com/jotai-labs/jotai-devtools/commit/8bf9f1274ca0ce6be02cdd97b5adbcdfa8fea105))
- update release workflow
  ([#11](https://github.com/jotai-labs/jotai-devtools/issues/11))
  ([2027b61](https://github.com/jotai-labs/jotai-devtools/commit/2027b61444a506cb729ea926eb184a954b229122))
- update release.yml
  ([261be26](https://github.com/jotai-labs/jotai-devtools/commit/261be268c53de1c865aa3a2b7cbee6470ad940cf))

## 0.0.1-alpha (2023-01-09)

### Features

- migrate devtools for Jotai v1 API
  ([#5](https://github.com/jotai-labs/jotai-devtools/issues/5))
  ([2c2d169](https://github.com/jotai-labs/jotai-devtools/commit/2c2d1694d26f39f0b1e70209e2d2cdeca403664a))
