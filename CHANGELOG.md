# Changelog

## 0.13.0 (2025-09-13)

- chore: update dependencies (#204)
  ([79b8a84](https://github.com/jotaijs/jotai-devtools/commit/79b8a84)), closes
  [#204](https://github.com/jotaijs/jotai-devtools/issues/204)
- refactor: support INTERNAL_buildStoreRev2 + drop support for older version
  (#201) ([0dcf91b](https://github.com/jotaijs/jotai-devtools/commit/0dcf91b)),
  closes [#201](https://github.com/jotaijs/jotai-devtools/issues/201)
- fix: building blocks are included on devStore (#198)
  ([3ca38db](https://github.com/jotaijs/jotai-devtools/commit/3ca38db)), closes
  [#198](https://github.com/jotaijs/jotai-devtools/issues/198)
- fix: remove direct dependency to jotai (#190)
  ([5a44e7f](https://github.com/jotaijs/jotai-devtools/commit/5a44e7f)), closes
  [#190](https://github.com/jotaijs/jotai-devtools/issues/190)

## 0.12.0 (2025-04-27)

- fix: re-add dev only export + add warning + docs around tree shaking (#186)
  ([9835e66](https://github.com/jotaijs/jotai-devtools/commit/9835e66)), closes
  [#186](https://github.com/jotaijs/jotai-devtools/issues/186)
- chore: update dependencies (#185)
  ([9982bf2](https://github.com/jotaijs/jotai-devtools/commit/9982bf2)), closes
  [#185](https://github.com/jotaijs/jotai-devtools/issues/185)
- refactor: drop support for dev\_\* methods (#180)
  ([2ab02e2](https://github.com/jotaijs/jotai-devtools/commit/2ab02e2)), closes
  [#180](https://github.com/jotaijs/jotai-devtools/issues/180)

## 0.11.0 (2025-02-19)

- fix: drop support for jotai store v1 (#173)
  ([5c19880](https://github.com/jotaijs/jotai-devtools/commit/5c19880)), closes
  [#173](https://github.com/jotaijs/jotai-devtools/issues/173)
- fix: guard restore action with isTimeTravelling atom (#174)
  ([8a2d303](https://github.com/jotaijs/jotai-devtools/commit/8a2d303)), closes
  [#174](https://github.com/jotaijs/jotai-devtools/issues/174)
- test(TimeTravel): async atom snapshot history (#170)
  ([efd498b](https://github.com/jotaijs/jotai-devtools/commit/efd498b)), closes
  [#170](https://github.com/jotaijs/jotai-devtools/issues/170)
- chore: update dependencies (#172)
  ([32dec78](https://github.com/jotaijs/jotai-devtools/commit/32dec78)), closes
  [#172](https://github.com/jotaijs/jotai-devtools/issues/172)
- docs: fix readme. (#162)
  ([12adbab](https://github.com/jotaijs/jotai-devtools/commit/12adbab)), closes
  [#162](https://github.com/jotaijs/jotai-devtools/issues/162)

## [0.10.1](https://github.com/jotaijs/jotai-devtools/compare/v0.10.0...v0.10.1) (2024-08-09)

### Bug Fixes

- atom toString includes debugLabel in dev mode
  ([#156](https://github.com/jotaijs/jotai-devtools/issues/156))
  ([609bd5a](https://github.com/jotaijs/jotai-devtools/commit/609bd5a06dce10090aac9db99a4d83cc5634b3cf))
- react warnings on async atom read in v2 store
  ([#160](https://github.com/jotaijs/jotai-devtools/issues/160))
  ([b27d779](https://github.com/jotaijs/jotai-devtools/commit/b27d7793726139488a66a17cee12a569e5482ccb))

## [0.10.0](https://github.com/jotaijs/jotai-devtools/compare/v0.9.1...v0.10.0) (2024-06-07)

### Features

- add support for Jotai store v2
  ([#145](https://github.com/jotaijs/jotai-devtools/issues/145))
  ([e707a68](https://github.com/jotaijs/jotai-devtools/commit/e707a687baccb2046680979e245573219b7d1e83))

## [0.9.1](https://github.com/jotaijs/jotai-devtools/compare/v0.9.0...v0.9.1) (2024-04-24)

### Bug Fixes

- remove global styles from final css build
  ([#139](https://github.com/jotaijs/jotai-devtools/issues/139))
  ([13e9d60](https://github.com/jotaijs/jotai-devtools/commit/13e9d603eb4d336aef8eb541a5507ceeebf64692))

## [0.9.0](https://github.com/jotaijs/jotai-devtools/compare/v0.8.0...v0.9.0) (2024-04-16)

### Features

- remove dependency to @emotion/react + adopt native css solution
  ([#129](https://github.com/jotaijs/jotai-devtools/issues/129))
  ([0b99ce0](https://github.com/jotaijs/jotai-devtools/commit/0b99ce015f1dfad130033ed348f2d2eddefb92fb))

## [0.8.0](https://github.com/jotaijs/jotai-devtools/compare/v0.7.1...v0.8.0) (2024-02-20)

### Features

- add position option
  ([#118](https://github.com/jotaijs/jotai-devtools/issues/118))
  ([9db1951](https://github.com/jotaijs/jotai-devtools/commit/9db195108ce82fa44f3dd72b0515d8a94d480048))

## [0.7.1](https://github.com/jotaijs/jotai-devtools/compare/v0.7.0...v0.7.1) (2023-12-04)

### Bug Fixes

- defer setAtom in subscribers of store change during main render to next micro
  task ([#109](https://github.com/jotaijs/jotai-devtools/issues/109))
  ([2cdc81d](https://github.com/jotaijs/jotai-devtools/commit/2cdc81d8342956cd2463e05e37c0524a9c36f1e6))

## [0.7.0](https://github.com/jotaijs/jotai-devtools/compare/v0.6.3...v0.7.0) (2023-10-14)

### Features

- hide private atoms in utils
  ([#105](https://github.com/jotaijs/jotai-devtools/issues/105))
  ([c925680](https://github.com/jotaijs/jotai-devtools/commit/c925680c00dfba205e9e1456476d02e2ada39c67))

## [0.6.3](https://github.com/jotaijs/jotai-devtools/compare/v0.6.2...v0.6.3) (2023-10-01)

### Bug Fixes

- add trigger button to global css
  ([#98](https://github.com/jotaijs/jotai-devtools/issues/98))
  ([1033c5e](https://github.com/jotaijs/jotai-devtools/commit/1033c5e5b81e2911eb81d3e7c9032b07f80be71c))

## [0.6.2](https://github.com/jotaijs/jotai-devtools/compare/v0.6.1...v0.6.2) (2023-08-21)

### Bug Fixes

- update jsondiffpatch to resolve process.platform undefined error
  ([#93](https://github.com/jotaijs/jotai-devtools/issues/93))
  ([19f885d](https://github.com/jotaijs/jotai-devtools/commit/19f885db2e292622be66fb9ec774150424cf0f73))

## [0.6.1](https://github.com/jotaijs/jotai-devtools/compare/v0.6.0...v0.6.1) (2023-08-02)

### Bug Fixes

- bundle in tabler-icons
  ([#88](https://github.com/jotaijs/jotai-devtools/issues/88))
  ([3c956b4](https://github.com/jotaijs/jotai-devtools/commit/3c956b4402588ceff0c1bda65b210fab343d243e))

## [0.6.0](https://github.com/jotaijs/jotai-devtools/compare/v0.5.3...v0.6.0) (2023-06-16)

### Features

- add time travel feature
  ([#79](https://github.com/jotaijs/jotai-devtools/issues/79))
  ([08d9dee](https://github.com/jotaijs/jotai-devtools/commit/08d9dee3d71379b701437d73c558afc91de9a478))

## [0.6.0-next.0](https://github.com/jotaijs/jotai-devtools/compare/v0.5.3...v0.6.0-next.0) (2023-06-15)

### Features

- add time travel feature
  ([53b916a](https://github.com/jotaijs/jotai-devtools/commit/53b916a1fc69182a64db06fbcd4eea08769c6538))
- hardcode locale to en-US for now
  ([312deff](https://github.com/jotaijs/jotai-devtools/commit/312deff99bbbb918d1885e4e144f3578d594fb92))

### Bug Fixes

- **create-timestamp.ts:** add default locale
  ([10c2ef8](https://github.com/jotaijs/jotai-devtools/commit/10c2ef832cda9a0bfffef77a91ee6ef7b65e40fd))

### Refactors

- **RecordHistory.tsx:** update tooltip content
  ([04187a2](https://github.com/jotaijs/jotai-devtools/commit/04187a2102b78142bf0af7835ef16a6d3c4d1460))

## [0.5.3](https://github.com/jotaijs/jotai-devtools/compare/v0.5.2...v0.5.3) (2023-05-11)

### Features

- use atom keys as debug label
  ([#74](https://github.com/jotaijs/jotai-devtools/issues/74))
  ([28db5b6](https://github.com/jotaijs/jotai-devtools/commit/28db5b674c9f1b4982945576ba55ec2577bcf5ee))
- version local storage keys
  ([#72](https://github.com/jotaijs/jotai-devtools/issues/72))
  ([4c88c60](https://github.com/jotaijs/jotai-devtools/commit/4c88c600a08808b6f47e51745b5de1118fe7515f))

### Bug Fixes

- add backwards compatible store support for <=2.1.0
  ([#70](https://github.com/jotaijs/jotai-devtools/issues/70))
  ([f1f6f79](https://github.com/jotaijs/jotai-devtools/commit/f1f6f7989de123d7fe013af4e9b62c9a9e11071e))

### Refactors

- cosmetic update streamline border radius
  ([#71](https://github.com/jotaijs/jotai-devtools/issues/71))
  ([7f8e70c](https://github.com/jotaijs/jotai-devtools/commit/7f8e70c3656cd46984beeda82286b4db93160ef3))
- extract action list item to its own component
  ([#75](https://github.com/jotaijs/jotai-devtools/issues/75))
  ([e218e5f](https://github.com/jotaijs/jotai-devtools/commit/e218e5f743100ec17e4c0361e9336405ec19021c))

## [0.5.2](https://github.com/jotaijs/jotai-devtools/compare/v0.5.1...v0.5.2) (2023-05-01)

### Bug Fixes

- avoid running preinstall scripts on userland
  ([#67](https://github.com/jotaijs/jotai-devtools/issues/67))
  ([2c49877](https://github.com/jotaijs/jotai-devtools/commit/2c49877d843d53f40ab7d339bfbb0559310422a0))

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
