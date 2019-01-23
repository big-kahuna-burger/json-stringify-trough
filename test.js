const test = require('tape')
const { Readable, Writable } = require('stream')
const JsonStringifyTrough = require('./index')

test('should throw arg err', t => {
  t.plan(1)
  t.throws(
    () => new JsonStringifyTrough('\t', undefined, 'not a fn'),
    'stringifier must be function'
  )
})

test('should stringify array of objects into JSON', t => {
  t.plan(1)
  let actual = ''

  function finish () {
    t.deepEqual(actual, '[{"a":1},{"b":2}]', 'expected stringified array')
  }

  const source = new Readable({
    objectMode: true,
    read: function (obj) {
      this.push(obj)
    }
  })

  const sink = new Writable({
    write: function (chunk, enc, cb) {
      actual += chunk
      cb()
    }
  })

  const tru = new JsonStringifyTrough()

  source.push({ a: 1 })
  source.push({ b: 2 })
  source.push(null)

  source
    .pipe(tru)
    .pipe(sink)
    .on('finish', finish)
})

test('should use replacer', t => {
  t.plan(1)
  let actual = ''

  function finish () {
    t.deepEqual(actual, '[{"a":4},{"b":2}]', 'expected to replace value')
  }

  const source = new Readable({
    objectMode: true,
    read: function (obj) {
      this.push(obj)
    }
  })

  const sink = new Writable({
    write: function (chunk, enc, cb) {
      actual += chunk
      cb()
    }
  })

  const tru = new JsonStringifyTrough((key, val) => (key === 'a' ? 4 : val))

  source.push({ a: 1 })
  source.push({ b: 2 })
  source.push(null)

  source
    .pipe(tru)
    .pipe(sink)
    .on('finish', finish)
})

test('should use spaces', t => {
  t.plan(1)
  let actual = ''

  function finish () {
    t.deepEqual(
      actual,
      '[{\n "a": 1\n},{\n "b": 2\n}]',
      'expected to use spaces'
    )
  }

  const source = new Readable({
    objectMode: true,
    read: function (obj) {
      this.push(obj)
    }
  })

  const sink = new Writable({
    write: function (chunk, enc, cb) {
      actual += chunk
      cb()
    }
  })

  const tru = new JsonStringifyTrough(1)

  source.push({ a: 1 })
  source.push({ b: 2 })
  source.push(null)

  source
    .pipe(tru)
    .pipe(sink)
    .on('finish', finish)
})

test('should use tabs', t => {
  t.plan(1)
  let actual = ''

  function finish () {
    t.deepEqual(
      actual,
      '[{\n\t"a": 1\n},{\n\t"b": 2\n}]',
      'expected to use tabs'
    )
  }

  const source = new Readable({
    objectMode: true,
    read: function (obj) {
      this.push(obj)
    }
  })

  const sink = new Writable({
    write: function (chunk, enc, cb) {
      actual += chunk
      cb()
    }
  })

  const tru = new JsonStringifyTrough('\t')

  source.push({ a: 1 })
  source.push({ b: 2 })
  source.push(null)

  source
    .pipe(tru)
    .pipe(sink)
    .on('finish', finish)
})
