# package.json 详解]

## 1、属性及属性值讲解
>
>- name: (必须)项目的名称，如果是第三方包的话，其他人可以通过该名称使用 npm install 进行安装。
>- version: (必须)项目的版本号，开源项目的版本号通常遵循 semver 语义化规范 X.Y.Z
>- repository: 项目的仓库地址以及版本控制信息。

``` js
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/react.git",
    "directory": "packages/react"
  }

```

>- description: 项目的描述，会展示在 npm 官网，让别人能快速了解该项目。
>- keywords: 项目的技术关键词,可以帮助别人在 npm 官网上更好地检索到此项目，增加曝光率。
>- homepage: 项目主页的链接，通常是项目 github 链接，项目官网或文档首页。
>- contributors：项目的贡献者
>- bugs: 项目 bug 反馈地址，通常是 github issue 页面的链接。
>- license: 项目的开源许可证。项目的版权拥有人可以使用开源许可证来限制源码的使用、复制、修改和再发布等行为。常见的开源许可证有 BSD、MIT、Apache 等
>- author: 项目作者
>- funding： 项目捐赠支持的地址
>- files: 项目在进行 npm 发布时，可以通过 files 指定需要跟随一起发布的内容来控制 npm 包的大小，避免安装时间太长。
 发布时默认会包括 package.json，license，README 和main 字段里指定的文件。忽略 node_modules，lockfile 等文件。
在此基础上，我们可以指定更多需要一起发布的内容。可以是单独的文件，整个文件夹，或者使用通配符匹配到的文件。

``` json
{
  "files": [
  "filename.js",
  "directory/",
  "glob/*.{js,json}"
 ]
}
```

>- type: 指定项目依赖导入方式, 可选值:`module`, `commonjs`, 默认 commonjs.
在 node 支持 ES 模块后，要求 ES 模块采用 .mjs 后缀文件名。只要遇到 .mjs 文件，就认为它是 ES 模块。如果不想修改文件后缀，就可以在 package.json文件中，指定 type 字段为 module。这样所有 .js 后缀的文件，node 都会用 ES 模块解释。如果还要使用 CommonJS 模块规范，那么需要将 CommonJS 脚本的后缀名都改成.cjs
两种模块规范最好不要混用，会产生异常报错。
>- main: 项目发布时，默认会包括 package.json，license，README 和main 字段里指定的文件，因为 main 字段里指定的是项目的入口文件，在 browser 和 Node 环境中都可以使用。
如果不设置 main 字段，那么入口文件就是根目录下的 index.js。
>- browser: main 字段里指定的入口文件在 browser 和 Node 环境中都可以使用。如果只想在 web 端使用，不允许在 server 端使用，可以通过 browser 字段指定入口。
>- module: 项目也可以指定 ES 模块的入口文件，这就是 module 字段的作用。当一个项目同时定义了 main，browser 和 module，像 webpack，rollup 等构建工具会感知这些字段，并会根据环境以及不同的模块规范来进行不同的入口文件查找。
>- exports: node 在 14.13 支持在 package.json 里定义 exports 字段，拥有了条件导出的功能。
exports 字段可以配置不同环境对应的模块入口文件，并且当它存在时，它的优先级最高。
比如使用 require 和 import 字段根据模块规范分别定义入口：

``` js
"exports": {
  "require": "./index.js",
  "import": "./index.mjs"
 }
```

这样的配置在使用 import 'xxx' 和 require('xxx') 时会从不同的入口引入文件，exports 也支持使用 browser 和 node 字段定义 browser 和 Node 环境中的入口。
上方的写法其实等同于：

``` js
"exports": {
  ".": {
    "require": "./index.js",
    "import": "./index.mjs"
  }
 }
```

>- workspaces: 项目的工作区配置，用于在本地的根目录下管理多个子项目。可以自动地在 npm install 时将 workspaces 下面的包，软链到根目录的 node_modules 中，不用手动执行 npm link 操作。
>- bin: 定义命令行执行的文件
>- scripts: 指定项目的一些内置脚本命令，这些命令可以通过 npm run 来执行。通常包含项目开发，构建 等 CI 命令
我们可以使用命令 `npm run build` / `yarn build` 来执行项目构建。
除了指定基础命令，还可以配合 pre 和 post 完成命令的前置和后续操作，比如

``` js
"scripts": {
  "build": "webpack",
  "prebuild": "xxx", // build 执行之前的钩子
  "postbuild": "xxx" // build 执行之后的钩子
}
```

当执行 npm run build 命令时，会按照 prebuild -> build -> postbuild 的顺序依次执行上方的命令。
但是这样的隐式逻辑很可能会造成执行工作流的混乱，所以 pnpm 和 yarn2 都已经废弃掉了这种 pre/post 自动执行的逻辑，参考 pnpm issue 讨论 [Don't run the pre/post scripts](https://github.com/pnpm/pnpm/issues/2891)
如果需要手动开启，pnpm 项目可以设置 .npmrc enable-pre-post-scripts=true。`enable-pre-post-scripts=true`

>- config: 用于设置 scripts 里的脚本在运行时的参数。比如设置 port 为 3001：

``` js
"config": {
  "port": "3001"
}
```

在执行脚本时，我们可以通过 npm_package_config_port 这个变量访问到 3001。
`console.log(process.env.npm_package_config_port); // 3001`

>- dependencies: 运行依赖，也就是项目生产环境下需要用到的依赖。
>- devDependencies: 开发依赖，项目开发环境需要用到而运行时不需要的依赖，用于辅助开发，通常包括项目工程化工具比如 webpack，vite，eslint 等。
>- peerDependencies: 对等依赖，比如你开发一个库需要依赖vue，你的项目也需要依赖vue，这个时候peerDependencies里的vue就会忽略安装，提高安装效率
比如 React 组件库 Ant Design，它的 package.json 里 peerDependencies 为

``` js
"peerDependencies": {
  "react": ">=16.9.0",
  "react-dom": ">=16.9.0"
}
```

>- optionalDependencies: 可选依赖，顾名思义，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的。
>- peerDependenciesMeta: 对等依赖标记 peerDependenciesMeta 将其指定为可选的。
>- bundleDependencies: 打包依赖。它的值是一个数组，在发布包时，bundleDependencies 里面的依赖都会被一起打包。
>- overrides: overrides 可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换。

比如某个依赖 A，由于一些原因它依赖的包 foo@1.0.0 需要替换，我们可以使用 overrides 修改 foo 的版本号：

``` js
"overrides": {
  "foo": "1.1.0-patch"
}
```

当然这样会更改整个依赖树里的 foo，我们可以只对 package 下的 foo 进行版本号重写：

``` js
"overrides": {
  "package": {
    "foo": "1.1.0-patch",
  }
}
```

overrides 支持任意深度的嵌套。

> 如果在 yarn 里也想复写依赖版本号，需要使用 `resolution` 字段，而在 pnpm 里复写版本号需要使用 `pnpm.overrides` 字段。

>- private: 如果是私有项目，不希望发布到公共 npm 仓库上，可以将 private 设为 true。
>- publishConfig: npm 包发布时使用的配置。

``` js
"publishConfig": {
  "registry": "https://registry.npmjs.org/"
}
```

>- engines: 一些项目由于兼容性问题会对 node 或者包管理器有特定的版本号要求，比如：

``` js
"engines": {
  "node": ">=14 <16",
  "pnpm": ">7"
}
```

要求 node 版本大于等于 14 且小于 16，同时 pnpm 版本号需要大于 7。

>- os: 在 linux 上能正常运行的项目可能在 windows 上会出现异常，使用 os 字段可以指定项目对操作系统的兼容性要求。 `"os": ["darwin", "linux"]`
>- cpu: 指定项目只能在特定的 CPU 体系上运行。`"cpu": ["x64", "ia32"]`
>-types(typings): 指定 TypeScript 的类型定义的入口文件 `"types": "./index.d.ts",`
>- unpkg: 可以让 npm 上所有的文件都开启 CDN 服务。
比如 vue package.json 的 unpkg 定义为 dist/vue.global.js `"unpkg": "dist/vue.global.js",`
>- jsdelivr: 与 unpkg 类似，vue 通过如下的配置
>- browserslist: 设置项目的浏览器兼容情况。babel 和 autoprefixer 等工具会使用该配置对代码进行转换。当然你也可以使用 .browserslistrc 单文件配置。

``` js
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

>- sideEffects: 显示设置某些模块具有副作用，用于 webpack 的 tree-shaking 优化。
比如在项目中整体引入 Ant Design 组件库的 css 文件 `import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'`
如果 Ant Design 的 package.json 里不设置 sideEffects，那么 webapck 构建打包时会认为这段代码只是引入了但并没有使用，可以 tree-shaking 剔除掉，最终导致产物缺少样式。
所以 Ant Design 在 package.json 里设置了如下的 sideEffects，来告知 webpack，这些文件具有副作用，引入后不能被删除。

``` js
"sideEffects": [
  "dist/*",
  "es/**/style/*",
  "lib/**/style/*",
  "*.less"
]
```

>- lint-staged: lint-staged 是用于对 git 的暂存区的文件进行操作的工具，比如可以在代码提交前执行 lint 校验，类型检查，图片优化等操作。

## 2、依赖安装详解
[semver](https://github.com/npm/node-semver#versions)
^1.2.3 := >=1.2.3 <2.0.0-0
^0.2.3 := >=0.2.3 <0.3.0-0
^0.0.3 := >=0.0.3 <0.0.4-0

~1.2.3 := >=1.2.3 <1.(2+1).0 := >=1.2.3 <1.3.0-0
~1.2 := >=1.2.0 <1.(2+1).0 := >=1.2.0 <1.3.0-0 (Same as 1.2.x)
~1 := >=1.0.0 <(1+1).0.0 := >=1.0.0 <2.0.0-0 (Same as 1.x)

## 3、npm 包发布

> npm publish

>- 登录 npm login
>- 发布 npm publish
>- 查看 npm view [<package-spec>]
