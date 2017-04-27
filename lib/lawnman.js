const { spawn } = require('child_process')
const debug = require('debug')('lawnman')
const nodemon = require('nodemon')
const yargs = require('yargs')

const splitArgs = args => {
  const { groups, current: latest } = args.reduce(
    ({ groups, current }, arg) => {
      // If an -a or --add option is detected,
      // add the current group to the list of groups,
      // and start from scratch
      if (~['-a', '--and'].indexOf(arg)) {
        groups.push(current)
        return { groups, current: [] }
      }

      // All other options are unknown... for now.
      if (arg[0] === '-') {
        throw new Error(`Unknown option: ${arg}`)
      }

      // Push all other arguments to the current group
      current.push(arg)

      return { groups, current }
    },
    { groups: [], current: [] }
  )

  // If we had some left-overs in the latest group, add it to the list of groups
  if (Object.keys(latest).length) groups.push(latest)

  return groups
}

/**
 * Converts an object to an shell args array.
 *
 * Example:
 * objToArgs({a: 1, b: 2})
 * // ['--a', '1', '--b', '2']
 *
 * @param  {Object} obj The object to convert
 * @return {Array}      Array of shell args
 */
const objToArgs = obj => {
  return Object.keys(obj).reduce((argv, key) => {
    argv.push(`--${key}`)
    argv.push(obj[key])
    return argv
  }, [])
}

// EXPOSED METHODS BELOW

/**
 * Parses cli arguments to options for nodemon and npm-run-all
 * @param  {String} args cli arguments
 * @return {Object}      Object containing arguments for nodemon and npm-run-all
 */
const parseArgs = allArgs => {
  return splitArgs(allArgs).map(args => {
    const script = args.pop()
    const ext = args.join()

    return {
      ext,
      exec: `npm-run-all --silent -l ${script}`,
    }
  })
}

// No demons plz
const run = nodemons => {
  if (!Array.isArray(nodemons))
    throw TypeError('First argument must be of type Array')

  if (typeof nodemons[0] === 'string') {
    debug('lawnman called with argv array:', nodemons)
    return run(parseArgs(nodemons))
  }

  debug('Running lawnman with %d groups:', nodemons.length)
  debug(nodemons)

  const cps = nodemons.map(options => {
    const args = ['-q'].concat(objToArgs(options))
    debug('spawning nodemon', args.join(' '))
    const cp = spawn('nodemon', args, {
      stdio: 'inherit',
    })

    cp.on('close', code => {
      console.log(`nodemon exited with code ${code}`)
      process.exit(code || 1)
    })

    return cp
  })

  return cps
}

module.exports = {
  parseArgs,
  run,
}
