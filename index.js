const { Transform } = require('stream')
let { stringify } = JSON
function JsonStringifyTrough (replacer, space, stringifier) {
  if (typeof replacer !== 'function') {
    space = replacer
    replacer = undefined
  }
  if (typeof space !== 'number' && typeof space !== 'string') {
    space = undefined
  }

  if (stringifier && typeof stringifier !== 'function') {
    throw new Error('stringifier must be function')
  }

  let first = true
  function transform (obj, encoding, cb) {
    const str = (stringifier || stringify)(obj, replacer, space)
    if (first) {
      first = false
      this.push(`[${str}`)
    } else {
      this.push(`,${str}`)
    }
    return cb()
  }

  function flush (cb) {
    this.push(`]`)
    this.push(null)
    return cb()
  }

  return new Transform({
    writableObjectMode: true,
    transform,
    flush
  })
}

module.exports = JsonStringifyTrough
