# build-esm
[![Build Status](https://travis-ci.org/vinsonchuong/build-esm.svg?branch=master)](https://travis-ci.org/vinsonchuong/build-esm)

Compile an ES Module for release on npm

## Installing
Install it locally to your project by running:

```bash
yarn add --dev build-esm
```

## Manual Deployment
Add `build-esm` as a `build` script to `package.json`:

```json
{
  "name": "project",
  "scripts": {
    "build": "build-esm"
  }
}
```

Then, run:

```bash
yarn build
```

`build-esm` copies all files that would be published by `npm publish` or
`yarn publish` (accounting for `.npmignore` and `files` in `package.json`) into
the `dist` directory, compiling all JavaScript files (with the `.js` extension)
using Babel. All of the standard ways of configuring Babel (through the `babel`
key in `package.json` and `.babelrc`) apply.

The package can be published by running:

```bash
npm publish dist
```

### Continuous Deployment
When publishing from a continuous integration service, `build-esm` can compile
files in-place, allowing `npm publish` without arguments to work as desired.

To enable in-place compilation, add `build-esm` as a `prepack` script to
`package.json`:

```json
{
  "name": "project",
  "scripts": {
    "prepack": "build-esm"
  }
}
```

Note that `prepack` is only supported in `npm` version 5 and greater.

Here are some example deployment workflows:
* [Travis CI](https://docs.travis-ci.com/user/deployment/npm/)
