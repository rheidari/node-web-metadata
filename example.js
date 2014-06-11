var metadata = require('./index.js');
var opts = {
  url: 'http://dlvr.it/5xfhth' //'http://leap.it'
};
metadata(opts, function (err, data) {
  // handle err or data here
  console.log(data.url);
  console.log(data.title);
  console.log(data.contentType);
  console.log(data.meta.description);
  console.log(data.meta['twitter:site']);
});
