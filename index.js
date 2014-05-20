var request = require('request')
  , cheerio = require('cheerio');

// override url by passing in as an argument:
var url = process.argv[2] || 'http://leap.it';

request(url, function (err, response, html) {
  var $ = cheerio.load(html)
    , meta = {};

  // parse all <meta> tags:
  $('head meta').each(function (index, elem) {
    var $this = $(this)
      , m = {};

    // prioritize key tag by: name, http-equiv, property:
    m.name = $this.attr('name') || $this.attr('http-equiv') || $this.attr('property');
    m.content = $this.attr('content');

    // if there is a name key, add it to the meta object, otherwise discard:
    if (m.name && m.content) {
      meta[m.name] = m.content;
    }
  });

  // parse the <title> tag:
  meta.title = meta.title || $('head title').text();

  // spit out the meta data to std out:
  console.log(meta);
  console.log(meta.title, meta['og:title'], meta.description, meta['og:description'], meta['og:image']);
});
