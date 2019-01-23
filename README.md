# json-stringify-trough

[![npm](https://img.shields.io/npm/v/json-stringify-trough.svg)](https://www.npmjs.com/package/json-stringify-trough)

[![Known Vulnerabilities](https://snyk.io/test/github/big-kahuna-burger/json-stringify-trough/badge.svg?targetFile=package.json)](https://snyk.io/test/github/big-kahuna-burger/json-stringify-trough?targetFile=package.json)

[![Build Status](https://travis-ci.org/big-kahuna-burger/json-stringify-trough.svg?branch=master)](https://travis-ci.org/big-kahuna-burger/json-stringify-trough)

[![Coverage Status](https://coveralls.io/repos/github/big-kahuna-burger/json-stringify-trough/badge.svg?branch=master)](https://coveralls.io/github/big-kahuna-burger/json-stringify-trough?branch=master)

Simply stringify a readable stream in objectMode and get that array as a complete valid JSON at readable side of transform stream.

Usefull if you want to do something like:

```js
  res.set('Content-Type', 'application/json')
  readableObjectStream
    .pipe(new JSONStringifyTrough())
    .pipe(res)
    .on('error', ...)
```

Saves you 1 buffering in case where you would collect all objects into array and then `JSON.stringify` all that.

Write simple benchmark code and test different stringifiers

[Fun with streams](https://www.youtube.com/watch?v=Gu2kuXbo4-w)
