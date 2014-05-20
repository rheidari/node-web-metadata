var extend = require('util')._extend
  , request = require('request')
  , cheerio = require('cheerio');

var noop = function () {};

function parseMetadata (opts, html) {
  var $ = cheerio.load(html)
    , metadata = {};

  if (opts.fields.url) {
    metadata.url = opts.url;
  }

  if (opts.fields.meta) {
    metadata.meta = {};

    // parse all <meta> tags and attach to metdata.meta object:
    $('head meta').each(function (index, elem) {
      var $this = $(this)
        , m = {};

      // prioritize key tag by: name, http-equiv, property:
      m.name = $this.attr('name') || $this.attr('http-equiv') || $this.attr('property');
      m.content = $this.attr('content');

      // if there is a name key, add it to the meta object, otherwise discard:
      if (m.name && m.content) {
        metadata.meta[m.name] = m.content;
      }
    });
  }

  if (opts.fields.title) {
    // parse the <title> tag:
    metadata.title = $('head title').last().text();
  }
  return metadata;
}

module.exports = function (opts, cb) {
  var defaultOpts = {
    fields: {
      url: true,
      meta: true,
      title: true
    }
  };

  // extend the default options with those passed in:
  opts = extend(defaultOpts, opts);
  if (!cb) { cb = noop; }

  // url is required:
  if (!opts.url && !opts.html) {
    process.nextTick(function () { cb('Missing url or html option'); });
    return;
  }

  if (opts.url) {
    // retrieve html for further processing:
    request(opts.url, function (err, response, html) {
      if (err) {
        cb('Error Retrieving HTML', err);
        return;
      }

      // complete!
      cb(null, parseMetadata(opts, html));
    });
  } else {
    // have the HTML, parse and return via callback:
    process.nextTick(function () { cb(null, parseMetadata(opts, opts.html)); });
  }
};
