#!/usr/bin/env node

const rc = require('rc')
const { parseRC } = require('./helpers')
const { run, parseArgs } = require('..')

const usage = () => {
  console.log(`usage: lawnman <exts> <script...> --and <exts> <script...>`)
  process.exit(1)
}

let args = process.argv.slice(2)

if (~args.indexOf('--help')) {
  usage()
}

if (args.length === 0) {
  const rc_args = rc('lawnman', '', () => {}, parseRC).args

  if (!rc_args) {
    usage()
  }

  args = rc_args.split(' ')
}

let groups
try {
  groups = parseArgs(args)
} catch (e) {
  console.log(e.message)
  usage()
}

run(groups)
