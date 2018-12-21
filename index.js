const { Transform } = require('stream')

function JsonStringifyTrough (replacer, space) {
  if (typeof replacer !== 'function') {
    space = replacer
    replacer = undefined
  }
  if (typeof space !== 'number' && typeof space !== 'string') {
    space = undefined
  }

  let first = true
  function transform (obj, encoding, cb) {
    const str = JSON.stringify(obj, replacer, space)
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
