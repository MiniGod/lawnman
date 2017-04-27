# lawnman

> Keeps the lawn clean

`lawnman` runs your npm scripts on changes.
Uses [`nodemon`][nodemon] and [`npm-run-all`][npm-run-all].

Inspired by [`yardman`][yardman].

## Install

```sh
npm i lawnman -D
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

Run the test script when js files change.
```sh
lawnman js test
```

Watch js and scss files and compile accordingly
- Runs `npm run babel` when `'**/*.js` changes
- Runs `npm run compass` when `'**/*.scss` or `'**/*.png'` changes

```sh
lawnman js babel --and scss png compass
```
_TODO:_
Watch js files and run multiple npm scripts  
`--` is only needed when running multiple scripts  
Runs `npm run test` and `npm run format` when any js files change
```sh
lawnman js -- test format
```


[nodemon]: http://npm.im/nodemon
[npm-run-all]: http://npm.im/npm-run-all
[yardman]: http://npm.im/yardman
