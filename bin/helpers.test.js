const test = require('ava')
const { parseRC: rc } = require('./helpers')

test('parseRC - single line', t => {
  t.deepEqual(rc('js test').args, 'js test')
  t.deepEqual(rc('js test --and cc rebuild').args, 'js test --and cc rebuild')
})

test('parseRC - multi line', t => {
  t.deepEqual(
    rc(`
      js test
    `).args,
    'js test'
  )

  t.deepEqual(
    rc(`
      js test

      cc rebuild
    `).args,
    'js test --and cc rebuild'
  )
})

test('parseRC - comments', t => {
  t.deepEqual(rc('#test').args, '')

  t.deepEqual(
    rc(`
      js test # tests

      # addon
      cc rebuild
    `).args,
    'js test --and cc rebuild'
  )
})
