# Angular2 Admin Framework

本应用使用 ng2+webpack+sass+karma+jasmine...组合方案构建一个后端管理交互界面，目的在于交流和学习。

目前只完成了整个应用的基本架构，界面基本布局以及左侧导航二级菜单，正在逐步完善中。。。

#### 关于UI
界面使用`bootstrap`扩展，UI组件使用`ng2-bootstrap`

#### 快速上手

```shell
$ npm install
$ npm start
```

基本使用命令
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
