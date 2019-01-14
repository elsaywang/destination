# Portal Monorepo

## Installation steps

All the commands stated here should be executed at the top level folder.

``` javascript

//Installation steps
$ npm run clean  /// this will remove your old node_modules
$ npm install // install lerna

// Setup - Lerna basically goes and runs npm i on each package.
$ npx lerna bootstrap

// Build - Lerna runs npm run build on each package.
$ npx lerna run build

```

## Run commands on all packages

To run a NPM command in all packages (if exists) is pretty easy with lerna

``` javascript

$ npx lerna run build // this executes the build command in all packages

```

## Run commands on specific packages.

ITs common that you dont want to run a command on all packages, so lets say that you only want to build Data Explorer App. For that you can use `--scope` flag from lerna which allows you to run a command on a specific project, the parameters must be the name of the package from its `package.json` it wont work with the directory name.

``` javascript

$ npx lerna run build --scope portal-signals-client

```

Please refer to [Lerna](https://github.com/lerna/lerna#readme) documentation to know more about lerna.
Otherwise you can always navigate to the exact package that you want to work on and run your know npm commands.

