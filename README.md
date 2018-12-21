# JSON-stringify-trough

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

[Fun with streams](https://www.youtube.com/watch?v=Gu2kuXbo4-w)