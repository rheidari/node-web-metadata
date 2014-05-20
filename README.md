#node-web-metadata

Retrieve a json object containing metadata from a url. Will returns an object consisting of the ```<title>```, ```url``` as well as any additional ```<meta/>``` information it is able to parse.

## Example
### Pull metadata from http://leap.it
javascript:
``` js
var metadata = require('web-metadata');
var opts = {
  url: 'http://leap.it'
};
metadata(opts, function (err, data) {
  // handle err or data here
  console.log(data.url);
  console.log(data.title);
  console.log(data.meta.description);
  console.log(data.meta['twitter:site']);
});
```

output:
``` text
http://leap.it
Leap.it
Leap.it - a whole new take on search. What are you looking to discover? Try it now!
@leapit
```
## Install
With [npm](http://npmjs.org) do:

 ```npm install web-metadata```

## License

MIT
