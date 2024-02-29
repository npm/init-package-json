# Changelog

## [6.0.1](https://github.com/npm/init-package-json/compare/v6.0.0...v6.0.1) (2024-02-29)

### Bug Fixes

* [`4eca245`](https://github.com/npm/init-package-json/commit/4eca245b0bb4576b9174efe4c1fbd5f3ddf68b73) [#263](https://github.com/npm/init-package-json/pull/263) move to @npmcli/package-json (@wraithgar)

### Dependencies

* [`85b4452`](https://github.com/npm/init-package-json/commit/85b4452f8f3c2060ff24ef8b8ff8a72dcae5a1ee) [#274](https://github.com/npm/init-package-json/pull/274) bump read from 2.1.0 to 3.0.1 (#274)
* [`16f1fcc`](https://github.com/npm/init-package-json/commit/16f1fcc94a8b5ac3f145ec4f2e6f5a340f46c54c) [#263](https://github.com/npm/init-package-json/pull/263) remove read-package-json
* [`5c0da7f`](https://github.com/npm/init-package-json/commit/5c0da7f5d83c78d7b688b45f236daedb4a083e38) [#263](https://github.com/npm/init-package-json/pull/263) add new dependency `@npmcli/package-json@4.0.1`

### Chores

* [`0a12bd7`](https://github.com/npm/init-package-json/commit/0a12bd77e8c1206f6427ecca6d46fb20357b1b70) [#273](https://github.com/npm/init-package-json/pull/273) bump @npmcli/config from 7.2.0 to 8.2.0 (#273) (@dependabot[bot])
* [`b216462`](https://github.com/npm/init-package-json/commit/b216462566c6a0ab627905a94d1c3ff21fc1121e) [#267](https://github.com/npm/init-package-json/pull/267) postinstall for dependabot template-oss PR (@lukekarrys)
* [`36addd8`](https://github.com/npm/init-package-json/commit/36addd83b459288dae6330bb0493572f1c676944) [#267](https://github.com/npm/init-package-json/pull/267) bump @npmcli/template-oss from 4.21.1 to 4.21.3 (@dependabot[bot])
* [`38ee762`](https://github.com/npm/init-package-json/commit/38ee762cc43577d25b512c1a7b185a17fd9c9582) [#261](https://github.com/npm/init-package-json/pull/261) postinstall for dependabot template-oss PR (@lukekarrys)
* [`642e170`](https://github.com/npm/init-package-json/commit/642e170a7060969c479005e47e7017c58f1691d7) [#261](https://github.com/npm/init-package-json/pull/261) bump @npmcli/template-oss from 4.19.0 to 4.21.1 (@dependabot[bot])
* [`4a9b5f1`](https://github.com/npm/init-package-json/commit/4a9b5f1832bd2709e6e432f019f1a964b7159910) [#239](https://github.com/npm/init-package-json/pull/239) postinstall for dependabot template-oss PR (@lukekarrys)
* [`0920582`](https://github.com/npm/init-package-json/commit/0920582b941e39a71bf3b89f3abe28d6533779a9) [#239](https://github.com/npm/init-package-json/pull/239) bump @npmcli/template-oss from 4.18.1 to 4.19.0 (@dependabot[bot])
* [`9e08db3`](https://github.com/npm/init-package-json/commit/9e08db33cd8705c0e1b1c0a44a4e000d8ffa4f94) [#238](https://github.com/npm/init-package-json/pull/238) postinstall for dependabot template-oss PR (@lukekarrys)
* [`4a274d1`](https://github.com/npm/init-package-json/commit/4a274d1b17be42a091b39672301b9e7b08e81395) [#238](https://github.com/npm/init-package-json/pull/238) bump @npmcli/template-oss from 4.18.0 to 4.18.1 (@dependabot[bot])

## [6.0.0](https://github.com/npm/init-package-json/compare/v5.0.0...v6.0.0) (2023-08-15)

### ⚠️ BREAKING CHANGES

* support for node 14 has been removed

### Bug Fixes

* [`97b1efe`](https://github.com/npm/init-package-json/commit/97b1efeccb6eac3d0669fcd5703ade57ec7fd148) [#235](https://github.com/npm/init-package-json/pull/235) drop node14 support (@lukekarrys)

### Dependencies

* [`9eccb04`](https://github.com/npm/init-package-json/commit/9eccb043c2993371013749a92702b6e4fcdd033d) [#233](https://github.com/npm/init-package-json/pull/233) bump read-package-json from 6.0.4 to 7.0.0
* [`3024040`](https://github.com/npm/init-package-json/commit/3024040dec8c5f0215f9dea8652a28669e9d1c9f) [#234](https://github.com/npm/init-package-json/pull/234) bump npm-package-arg from 10.1.0 to 11.0.0

## [5.0.0](https://github.com/npm/init-package-json/compare/v4.0.1...v5.0.0) (2023-02-06)

### ⚠️ BREAKING CHANGES

* this module is now Promise only and no longer accepts a callback parameter

### Features

* [`8b919b7`](https://github.com/npm/init-package-json/commit/8b919b74149af92f4cad76c96080a254a72b7018) refactor (@lukekarrys)

## [4.0.1](https://github.com/npm/init-package-json/compare/v4.0.0...v4.0.1) (2022-10-18)

### Dependencies

* [`4dea768`](https://github.com/npm/init-package-json/commit/4dea7685efa3a596eb04d2d4de21902efb0f6c84) [#172](https://github.com/npm/init-package-json/pull/172) bump npm-package-arg from 9.1.2 to 10.0.0

## [4.0.0](https://github.com/npm/init-package-json/compare/v3.0.2...v4.0.0) (2022-10-14)

### ⚠️ BREAKING CHANGES

* `init-package-json` is now compatible with the following semver range for node: `^14.17.0 || ^16.13.0 || >=18.0.0`

### Features

* [`e8ea83a`](https://github.com/npm/init-package-json/commit/e8ea83a9546678c63b8f4d842e0819fced2f7513) [#159](https://github.com/npm/init-package-json/pull/159) postinstall for dependabot template-oss PR (@lukekarrys)

### Dependencies

* [`b869b31`](https://github.com/npm/init-package-json/commit/b869b31550beb4a66f72e0232aee2b4e0225a282) [#170](https://github.com/npm/init-package-json/pull/170) bump read-package-json from 5.0.2 to 6.0.0 (#170)
* [`d342821`](https://github.com/npm/init-package-json/commit/d342821532d3066b2db6f681e922131cd5943b01) [#168](https://github.com/npm/init-package-json/pull/168) bump validate-npm-package-name from 4.0.0 to 5.0.0 (#168)

### [3.0.2](https://github.com/npm/init-package-json/compare/v3.0.1...v3.0.2) (2022-03-29)


### Dependencies

* bump validate-npm-package-name from 3.0.0 to 4.0.0 ([#144](https://github.com/npm/init-package-json/issues/144)) ([fa7574a](https://github.com/npm/init-package-json/commit/fa7574adb3672c8c7b537bf960c7860900828ecb))
* update npm-package-arg requirement from ^9.0.0 to ^9.0.1 ([#136](https://github.com/npm/init-package-json/issues/136)) ([b1ec548](https://github.com/npm/init-package-json/commit/b1ec548592760fd95b6d60f98e61abe4fe84f09f))

### [3.0.1](https://www.github.com/npm/init-package-json/compare/v3.0.0...v3.0.1) (2022-03-15)


### Dependencies

* bump read-package-json from 4.1.2 to 5.0.0 ([#134](https://www.github.com/npm/init-package-json/issues/134)) ([3b7a109](https://www.github.com/npm/init-package-json/commit/3b7a1099ee0241e8dc1f0ff95eca999a699699fc))

## [3.0.0](https://www.github.com/npm/init-package-json/compare/v2.0.5...v3.0.0) (2022-02-16)


### ⚠ BREAKING CHANGES

* this drops support for node10 and non-LTS versions of node12 and node14

### Dependencies

* @npmcli/template-oss@2.7.1 ([257ba39](https://www.github.com/npm/init-package-json/commit/257ba391909a7220da964128836b40b14728fab3))
* npm-package-arg@9.0.0, @npmcli/config@4.0.0 ([5e744c8](https://www.github.com/npm/init-package-json/commit/5e744c8269a75acfb93ce00a8472532873ffdb47))
* update read requirement from ~1.0.1 to ^1.0.7 ([4425b9a](https://www.github.com/npm/init-package-json/commit/4425b9af9ba4136f4df13ad84cfb541312d4eadf))

## [2.0.0](https://github.com/npm/init-package-json/compare/v1.10.3...v2.0.0) (2020-10-09)
* BREAKING: requires node10+
* fix: compat with new `@npmcli/config` module
* chore: update deps to latest and greatest

<a name="1.10.3"></a>
## [1.10.3](https://github.com/npm/init-package-json/compare/v1.10.2...v1.10.3) (2018-03-07)



<a name="1.10.2"></a>
## [1.10.2](https://github.com/npm/init-package-json/compare/v1.10.1...v1.10.2) (2018-03-07)


### Bug Fixes

* **default-input:** Catch errors from npa ([#71](https://github.com/npm/init-package-json/issues/71)) ([11aee1e](https://github.com/npm/init-package-json/commit/11aee1e))
* **grammar:** Fix minor style issue in final prompt ([#76](https://github.com/npm/init-package-json/issues/76)) ([ba259ce](https://github.com/npm/init-package-json/commit/ba259ce))
