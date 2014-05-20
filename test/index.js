var assert = require("assert")
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

  it('will parse test html string', function (done) {
    var data = "<!DOCTYPE html><html><head><meta name='test' content='testing' /></head><body></body></html>";
    metadata({html:data}, function (err, data) {
      assert.equal(err, null);
      assert.notEqual(data, null);
      assert.equal(data.meta.test, 'testing');
      done();
    });
  });

  it('will parse multiple head tags', function (done) {
    var data = "<!DOCTYPE html><html><head><meta name='test' content='testing1' /></head><head><meta name='test' content='testing' /></head><body></body></html>";
    metadata({html:data}, function (err, data) {
      assert.equal(err, null);
      assert.notEqual(data, null);
      assert.equal(data.meta.test, 'testing');
      done();
    });
  });
});
