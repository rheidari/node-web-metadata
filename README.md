#node-web-metadata

Pulls metadata from a URL and returns it.

## example
### Pull metadata from http://leap.it
javascript:
``` js
var metadata = require('node-web-metadata');
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

## Options
url

# license

MIT
