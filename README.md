# lawnman

> Keeps the lawn clean

`lawnman` runs your npm scripts on changes.
Uses [`nodemon`][nodemon] and [`npm-run-all`][npm-run-all].

Inspired by [`yardman`][yardman].

## Install

```sh
npm i lawnman -D
```

Then use lawnman in your package.json scripts:

```
{
  "scripts": {
    "dev": "lawnman js,json lint test",
    "lint": "eslint lib/ --fix",
    "test": "ava"
  }
}
```

## Usage

```
lawnman <ext> [...<ext>] <script>\
  --and\
  <ext> [...<ext>] <script>\
  --and\
  ...
```

## Examples

Run the test script when any js file change.
```sh
lawnman js test
```

Watch js and scss files and compile accordingly
- Runs `npm run babel` when any js changes
- Runs `npm run compass` when any scss or png file changes

```sh
lawnman js babel --and scss png compass
```

Watch js files and run multiple npm scripts  
Runs `npm run test` and `npm run format` when any js files change
```sh
lawnman js test format
```


[nodemon]: http://npm.im/nodemon
[npm-run-all]: http://npm.im/npm-run-all
[yardman]: http://npm.im/yardman
