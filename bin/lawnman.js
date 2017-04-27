#!/usr/bin/env node

const { run, parseArgs } = require('..')

const usage = () => {
  console.log(`usage: lawnman <exts> <script...> --and <exts> <script...>`)
  process.exit(1)
}

let groups
try {
  groups = parseArgs(process.argv.slice(2))
} catch (e) {
  console.log(e.message)
  usage()
}

run(groups)
