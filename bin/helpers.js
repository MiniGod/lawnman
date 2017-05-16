const parseRC = content => {
  return {
    args: content
      .split(/\n{2,}/)
      .map(group =>
        group
          .split('\n')
          .map(line => line.replace(/\s*#.*$/, '').trim())
          .filter(line => line.trim().length)
          .join(' ')
      )
      .join(' --and '),
  }
}

module.exports = {
  parseRC,
}
