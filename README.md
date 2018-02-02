## Signals Server and Client Stack

This repo includes both the `client` and `server` parts of the Signals app.

* `/` - can run server and client side start commands
    * `client` - Signals UI using React
    * `server` - Node.js Server with ALB configuration (relies on ALB and UI build)

### Pre-requisites

Node 6+ (spread operator support)

* Please use [nvm](https://github.com/creationix/nvm) if you are need to use multiple versions of node.

### Quickstart

Before anything, run `npm install` to get all the dependencies in `client` and `server`.

To run UI for development only (http://localhost:3000):

1. `npm run client` will start webpack dev server using react-scripts from [Create React App](https://github.com/facebookincubator/create-react-app), which supports hot reloading.

To run Node server by itself for Node/Express development - (http://localhost:8081 - NO ALB):

1. `npm start` to build UI and start Node server (no nodemon)

To run prod-like Node server with ALB and prod UI files (http://localhost:8888/portal/signals):

1. Clone the [portal-alb](https://git.corp.adobe.com/AAM/portal-alb) project and start it by following the README instructions.
2. From this project's root `/`, open `client/package.json` in an editor and add `"homepage": "http://localhost:8888/portal/signals"` so that files built in `client` will all have the ALB url prepended.
3. Now build the necessary prod files by running `npm run build` in `client`.
4. From this project's root `/`, run `npm run prod` to start Node server.
5. Navigate to http://localhost:8888/portal/signals in your browser and it should work. If it fails, stop here, something is wrong.

To use portal API and portal UI (http://localhost:8080/portal/signals):

1. Make sure ALB is running from above instructions, and catalina is running with portal
2. Log in to portal through http://localhost:8080/portal to get JSESSION cookie.
3. Make sure Portal ALB, Node Server is running. Navigate to http://localhost:8080/portal/signals, and it should show the Portal Signals app.
