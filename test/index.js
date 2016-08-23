var assert = require('assert')
  , fs = require('fs')
  , metadata = require('../index.js');

describe('node-web-metadata', function () {

  it('expects a url or html option', function (done) {
    metadata(null, function (err, data) {
      assert.equal(err.message, 'Missing url or html option');
      done();
    });
  });

  it('expects a valid url', function (done) {
    metadata({url:'invalidurl'}, function (err, data) {
      assert.equal(err.message, 'Error Retrieving HTML');
      done();
    });
  });

  it('returns data on success', function (done) {
    metadata({url:'http://google.com'}, function (err, data) {
      assert.equal(err, null);
      assert.notEqual(data, null);
      done();
    });
  });

  it('will parse test html data', function (done) {
    fs.readFile('test/html/test.html', 'utf8', function (err, data) {
      metadata({html:data}, function (err, data) {
        assert.equal(err, null);
        assert.equal(data.meta.description, 'test html pass');
        assert.equal(data.title, 'test');
        done();
      });
    });
  });

  it('will parse multiple head tags', function (done) {
    fs.readFile('test/html/malformed_multiple_head_tags.html', 'utf8', function (err, data) {
      metadata({html:data}, function (err, data) {
        assert.equal(err, null);
        assert.equal(data.meta.description, 'test description #1');
        assert.equal(data.title, 'testing head #1');
        assert.deepEqual(data.meta.descriptions, ['test description #1', 'test description #2'])
        done();
      });
    });
  });

  it('will parse malformed html tag data', function (done) {
    fs.readFile('test/html/malformed.html', 'utf8', function (err, data) {
      metadata({html:data}, function (err, data) {
        assert.equal(err, null);
        assert.equal(data.meta.description, 'test html pass');
        assert.equal(data.title, 'test');
        done();
      });
    });
  });

  it('will return contentType for a website url', function (done) {
    metadata({url:'http://google.com'}, function (err, data) {
      assert(data.contentType.indexOf('text/html') !== -1);
      assert.notEqual(data.url, null);
      done();
    });
  });

  it('will return contentType for an image url', function (done) {
    metadata({url:'https://placekitten.com/g/200/300'}, function (err, data) {
      assert(data.contentType.indexOf('image/jpeg') !== -1);
      assert.notEqual(data.url, null);
      done();
    });
  });

  it('will return contentType for a video url', function (done) {
    metadata({url:'http://scontent-sin1-1.cdninstagram.com/t50.2886-16/13248162_1066593200053350_416643217_n.mp4'}, function (err, data) {
      assert(data.contentType.indexOf('video/mp4') !== -1);
      assert.notEqual(data.url, null);
      done();
    });
  }).timeout(5000);
});
