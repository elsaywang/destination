# Portal Monorepo

## Installation steps

All the commands stated here should be executed at the top level folder.

``` javascript

//Installation steps
npm run clean  /// this will remove your old node_modules
npm install // install lerna

// Setup - Lerna basically goes and runs npm i on each package.
npx lerna bootstrap

// Build - Lerna runs npm run build on each package.
npx lerna run build

```

Please refer to lerna documentation to know more about the capabilites of lerna and if you want to execute specific commands on a specific package.

Otherwise you can always navigate to the exact package that you want to work on and run your know npm commands.

