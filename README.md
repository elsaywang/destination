# Portal Monorepo

## Installation steps

### First Time Installation:
1. Clone repo 
2. Make sure you are logged into https://www.npmjs.com with your adobe corporate email address (and you have recieved the confirmation email and clicked through to validate/confirm email address)
3. Make sure you have a `.npmrc` file in the top level (root) user of your computer with adobe artifactory `_auth` secret, and adobe corporate email address. Your top level `.npmrc` file should look something like this:
    ``` bash
    _auth={ADOBE-SECRET-TOKEN-HERE}
    always-auth=true
    email={ADOBE-CORPORATE-EMAIL-ADDRESS-HERE}
    ```
4. You may need to restart your terminal processes for these changes to take effect
5. For first time installation, begin at the top level of the project folder with: `npm install`
6. Then (at the top level folder) run: `npx lerna bootstrap`
7. Then navigate to your desired package (such as signals) `/portal-signals/packages/{DESIRED-PACKAGE}` and from the desired package folder, run: `npx lerna run build` 
8. Then from the same place within your desired package folder (such as signals) `/portal-signals/packages/{DESIRED-PACKAGE` execute the start command: `npm start`
9. Your localhost should now be up and running! :) 


## After (Successful) First Time Installation:
``` javascript
Execute at the top level folder:
$ npm run clean  /// this will remove your old node_modules
$ npm install // install lerna


Navigate to the correct package and execute:
$ npx lerna bootstrap //set up
$ npm start //start the desired package
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

Lets do this via an example, lets say that we want to create a component called `amm-component` that will be a react component to be used in `Destinations` app

### Create your new package

Lerna offers a way to create a new package that will be part of your mono-repo

```javascript
$ npx lerna create @aam/aam-component --yes
```

That command will create a new directory under packages called `aam-component`, containing

- `_test_` folder
- `lib` folder with the source code
- `lib/aam-component.js` which is the entry point for now for our component
- `package.json` with the project documentation
- `README.md` readme for the project

If you look at its package.json will look something like this.

``` json
{
  "name": "@aam/aam-component",
  "version": "0.0.0",
  "description": "Now I’m the model of a modern major general / The venerated Virginian veteran whose men are all / Lining up, to put me up on a pedestal / Writin’ letters to relatives / Embellishin’ my elegance and eloquence / But the elephant is in the room / The truth is in ya face when ya hear the British cannons go / BOOM",
  "keywords": [],
  "author": "XXXXX",
  "license": "ISC",
  "main": "lib/aam-c.js",
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "lib"
  ],
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git@git.corp.adobe.com:AAM/portal-signals.git"
  },
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1"
  }
}
```
### Configure your component

Since we are trying to create a `React` component to be used somewhere else, lets add some dependencies to build our react component using `Babel` and `preset-react` (we are trying to keep as simple as possible)

``` json
"dependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.2.2",
    "@babel/preset-react": "^7.0.0",
    "react": "^16.7.0"
}
```
And lets install those dependencies

```javascript
$ npm i
```

Obviously we want to be able to build the component, so in order to do that we can use `Babel-CLI`, so add the next script in the scripts section of your `package.json`

``` json
{
    "scripts": {
        "build": "npx babel --presets @babel/preset-react lib/aam-component.js -o index.js"
    }
}
```

and lets update the `package.json` to make our transpiled file the entry point of our package

``` json
{
    "main": "index.js"
}
```

Finally for lets create a React component in `lib/aam-component.js`

``` javascript
import React from 'react';

class Hello extends React.Component {
    render() {
        return <div>Hello, World!</div>;
    }
};

export default Hello;

```

Once you have all this pieces you can run the build command for your package either at the package level or at the top monorepo level

``` javascript
// if you are in /packages/aam-component
$ npm run build

// if you are at /
$ npx lerna run build --stream --scope @aam/aam-component
```

### Use the new component in Destinations app

In order to start using your new component in `Destinations`, the fist step will be to add the dependency in  `destinations/package.json`.
Make sure that you are using the `name` and `version` defined in `@aam/aam-component` so `Lerna` can bootstrap and make the correct relationship between this two components

``` json
{

    "dependencies": {
    "@aam/aam-component": "0.0.0",
}
```

The next step will be to bootstrap your app using `Lerna` so the links between the components can be created, you need to execute this at the top level of the project

``` javascript
$ npx lerna bootstrap
```

Once you have this, your component is ready to be used in Destinations, how ? simply import the component and use it in your JSX

``` jsx
import AamComponent from '@aam/aam-component'

...
render () {(
        <AamComponent></AamComponent>
)}
```

A recommendation would be to have your component building activelly with the `--watch` flag so the changes can be picked up by the `Destinations` app, so your console would look somewhat like

```javascript
//console window 1
$ npx lerna run build --scope @aam/aam-component --stream -- -- --watch

//console window 2
$ npx lerna run start --scope --stream portal-destinations-client
```

And yes there are 2 pairs of `--` before `--watch` this is to be able to bubble the flag from lerna through `npm` all the way to `babel`

#### Notes
The result of this is an improved developer experience, allowing you to update a dependency without having to publish to npm forcing you to update your package.json with the latest version.

Please refer to [Lerna](https://github.com/lerna/lerna#readme) documentation to know more about lerna.

