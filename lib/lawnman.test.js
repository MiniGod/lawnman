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

test('parse(js,json test)', t => {
  t.deepEqual(p('js,json test'), [
    {
      ext: 'js,json',
      exec: 'npm-run-all --silent -l test',
    },
  ])
})

test('parse(js,json test format)', t => {
  t.deepEqual(p('js,json test format'), [
    {
      ext: 'js,json',
      exec: 'npm-run-all --silent -l test format',
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

// Handle bad users :(
test('parse(-a)', t => {
  t.throws(() => p('-a'), 'Missing extensions to watch (group 1)')
})

test('parse(js -a)', t => {
  t.throws(() => p('js -a'), 'Missing script to run (group 1)')
})

test('parse(js test -a)', t => {
  t.deepEqual(p('js test -a'), [
    {
      ext: 'js',
      exec: 'npm-run-all --silent -l test',
    },
  ])
})

test('parse(js test -a cc)', t => {
  t.throws(() => p('js test -a cc'), 'Missing script to run (group 2)')
})
