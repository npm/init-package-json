# Changelog

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
