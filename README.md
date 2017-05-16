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
lawnman <ext>[,<ext>,...] <script> [<script...>]\
  --and\
  <ext>[,<ext>,...] <script> [<script...>]\
  --and\
  ...
```

## Examples

Run the test script when any js file change.
```sh
lawnman js test
```

Watch js and scss files and compile accordingly
- Runs `npm run babel` when any js file changes
- Runs `npm run compass` when any scss or png file changes

```sh
lawnman js babel --and scss,png compass
```

Watch js files and run multiple npm scripts  
Runs `npm run test` and then `npm run format` when any js files change
```sh
lawnman js test format
```

# .lawnmanrc

If you only have one script in `package.json` that uses lawnman, you can put the arguments into a `.lawnmanrc` file.

For example, if you have this script in your `package.json`

```json
{
  "scripts": {
    "dev": "lawnman cpp,cc,h,hpp,gyp rebuild e2e --and js,json lint test --and scss compass",
    "test": "...", ...
  }
}
```

You can put the arguments into a `.lawnmanrc` file to clean up your `package.json` to have it only run `lawnman`. Empty lines is like `--and` in the command line. It also supports comments.

```bash
# Build addons and run end-to-end tests
cpp,cc,h,hpp,gyp rebuild e2e

# Lint and test javascript
js,json lint test

# Compile scss
scss compass
```

Your `dev` script will then look much nicer

```json
{
  "scripts": {
    "dev": "lawnman",
    "test": "...", ...
  }
}
```

[nodemon]: http://npm.im/nodemon
[npm-run-all]: http://npm.im/npm-run-all
[yardman]: http://npm.im/yardman
