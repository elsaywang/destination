# eslint-config-aam
This package contains AAM portal team's eslint rules as an extensible shared config. It is published to artifactory and can be consumed in any node environment as a package. 

To set up, put these lines in your `~/.npmrc` or `.npmrc` in root directory of project:
```
@aam:registry=https://artifactory.corp.adobe.com/artifactory/api/npm/npm-eslint-config-aam-dev-local/
```

Then install using:
`npm install --only=dev @aam/eslint-config-aam`


To consume the regular rules, create an `.eslintrc` in the root of the directory with this configuration:
```
{
    "extends": "@aam/eslint-config-aam"
}
```

For legacy projects, pre-ES6, you may use the legacy configuration at the root of such directories as an additional `.eslintrc`:
```
{
    "extends": "@aam/eslint-config-aam/legacy"
}
```
