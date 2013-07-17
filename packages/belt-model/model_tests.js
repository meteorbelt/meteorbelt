
Tinytest.add('belt - model - Model is Global', function (test) {
  test.isTrue(typeof Model !== 'undefined');
});

var postSchema = {
  title:       { type: String, required: true },
  body:        { type: String, required: true },
  publishedAt: { type: Date, required: true },
  isPublished: { type: Boolean, 'default': false },
};

Tinytest.add('belt - model - _populate', function (t) {
  var doc = {
    title: 1, // will be converted to string
    body: "Post Body",
    publishedAt: '7/7/7' // will be converted to Date
  };

  var expect = {
    title: "1", // will be converted to string
    body: "Post Body",
    publishedAt: new Date('7/7/7') // will be converted to Date
  };

  // start off with an empy doc
  var p = new Model({}, postSchema);
  p._populate(doc);
  t.equal(p.title, expect.title);
  t.equal(p.body, expect.body);
  t.equal(p.publishedAt, expect.publishedAt);

  // reset
  p = {};

  // populate on construction
  // start off with an empy doc
  p = new Model(doc, postSchema);
  t.equal(p.title, expect.title);
  t.equal(p.body, expect.body);
  t.equal(p.publishedAt, expect.publishedAt);
});

Tinytest.add('belt - model - validate', function (t) {
  // valid
  // -----
  var doc1 = {
    title: "Hello World",
    body: "Post Body",
    publishedAt: new Date()
  };

  var p1 = new Model(doc1, postSchema);
  t.equal(p1.validate(), null);

  // invalid
  // -------
  var doc2 = {
    title: 42,
    isPublished: 'yes please',
    publishedAt: 'hello'
  };
  var p2 = new Model(doc2, postSchema);
  var err = {
    body: "required",
  };
  t.equal(p2.validate(), err);
});

Tinytest.add('belt - model - schema', function (t) {
  var doc1 = {
    title: "Hello World",
    body: "Post Body",
    publishedAt: new Date()
  };

  var p = new Model(doc1, postSchema);

  // mix in another schema to try and break things
  var commentSchema = {
    name: String
  };
  var com1 = {
    name: 'George'
  };

  var c = new Model(com1, commentSchema);

  p._populate({extra: 'new stuff'});
  c._populate({extra: 'new stuff'});

  // won't show up because the extra property is not present in the schema
  // XXX failing on IE8 ???? Only when the next test is present
  t.equal(p.extra, undefined);

  // XXX populate replaces all attributes with those that
  // are passed in.
  // t.equal(c.name, com1.name);
  // t.equal(p.title, doc1.title);
  // t.equal(p.body, doc1.body);
  t.equal(c.name, null);
  t.equal(p.title, null);
  t.equal(p.body, null);
});

Tinytest.addAsync('belt - model - save', function (t, done) {
  // TODO
  done();
});

Tinytest.addAsync('belt - model - insert', function (t, done) {
  // TODO
  done();
});

Tinytest.addAsync('belt - model - update', function (t, done) {
  // TODO
  done();
});

Tinytest.addAsync('belt - model - remove', function (t, done) {
  // TODO
  done();
});
