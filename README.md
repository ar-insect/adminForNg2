[![CircleCI](https://circleci.com/gh/r-park/angular2-webpack-seed.svg?style=shield&circle-token=889e179b1930b3f3291bbf27a4da6df98726edf0)](https://circleci.com/gh/r-park/angular2-webpack-seed)


# Angular2 Webpack Seed


- Angular 2.0.1
- Jasmine
- Karma
- SASS
- Typescript 2
- Webpack 2


#### Features
- Inline external HTML templates into typescript component files (optional)
- Inline and autoprefix external SCSS files into typescript component files (optional)
- Inject style tags into `index.html` (optional)
- Inject script tags into `index.html`
- Bundle and minify release builds


Getting Started
---------------

#### Prerequisites
- `node >= 6`

#### Quick Start

```shell
$ npm install
$ npm start
```


Usage
-----

|Script|Description|
|---|---|
|npm start|Start webpack development server @ **localhost:3000**|
|npm run build|Lint, test, and build the application to **./target**|
|npm run lint|Lint **.ts** and **.js** files|
|npm run lint:js|Lint **.js** files with eslint|
|npm run lint:ts|Lint **.ts** files with tslint|
|npm run server|Start express server @ **localhost:3000** to serve built artifacts from **./target**|
|npm test|Run unit tests with Karma and Jasmine|
|npm run test:watch|Run unit tests with Karma and Jasmine; watch for changes to re-run tests|
|npm version|Bump package.json version, generate CHANGELOG.md, git commit and tag (see [npm version](https://docs.npmjs.com/cli/version))|
