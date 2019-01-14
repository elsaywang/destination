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

It's common that you dont want to run a command on all packages, so lets say that you only want to build Data Explorer App. For that you can use `--scope` flag from lerna which allows you to run a command on a specific project, the parameters must be the name of the package from its `package.json` it wont work with the directory name.

``` javascript

$ npx lerna run build --scope portal-signals-client

```

## Adding a new package.

If you want to add a new package, please do it inside the packages folder, that way can follow the lerna structure. Lerna allows you to resolve the dependency of a module with the local project instead of resolving with the npm registry, this is done via a symlink.

The result of this is an improved developer experience, allowing you to update a dependency without having to publish to npm forcing you to update your package.json with the latest version.

## You dont wnat to know about lerna

You can always navigate to the exact package that you want to work on and run your know npm commands.


## Notes
Please refer to [Lerna](https://github.com/lerna/lerna#readme) documentation to know more about lerna.

