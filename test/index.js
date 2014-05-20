var assert = require('assert')
  , fs = require('fs')
  , metadata = require('../index.js');

describe('node-web-metadata', function () {

  it('expects a url or html option', function (done) {
    metadata(null, function (err, data) {
      assert.equal(err, 'Missing url or html option');
      done();
    });
  });

  it('expects a valid url', function (done) {
    metadata({url:'invalidurl'}, function (err, data) {
      assert.equal(err, 'Error Retrieving HTML');
      done();
    });
  });

  it('returns data on success', function (done) {
    metadata({url:'http://leap.it'}, function (err, data) {
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
        assert.equal(data.meta.description, 'test description #2');
        assert.equal(data.title, 'testing head #2');
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
    })
  })
});
