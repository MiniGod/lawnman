const test = require('ava')
const { parseArgs } = require('./lawnman.js')

const p = str => parseArgs(str.split(' '))

test('parse(js test)', t => {
  t.deepEqual(p('js test'), [
    {
      ext: 'js',
      exec: 'npm-run-all --silent -l test',
    },
  ])
})

test('parse(js json test)', t => {
  t.deepEqual(p('js json test'), [
    {
      ext: 'js,json',
      exec: 'npm-run-all --silent -l test',
    },
  ])
})

test('parse(js test --and cc rebuild)', t => {
  t.deepEqual(p('js test --and cc rebuild'), [
    {
      ext: 'js',
      exec: 'npm-run-all --silent -l test',
    },
    {
      ext: 'cc',
      exec: 'npm-run-all --silent -l rebuild',
    },
  ])
})
