
Tinytest.add('belt - model - Belt.Model is Global', function (test) {
  test.isTrue(typeof Belt.Model !== 'undefined');
});

var postSchema = {
  title:       { type: String, required: true },
  body:        { type: String, required: true },
  publishedAt: { type: Date, required: true },
  isPublished: { type: Boolean, default: false },
};

Tinytest.add('belt - model - populate', function (t) {
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
  var p = new Belt.Model({}, postSchema);
  p.populate(doc);
  t.equal(p.title, expect.title);
  t.equal(p.body, expect.body);
  t.equal(p.publishedAt, expect.publishedAt);

  // reset
  p = {};

  // populate on construction
  // start off with an empy doc
  p = new Belt.Model(doc, postSchema);
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

  var p1 = new Belt.Model(doc1, postSchema);
  t.equal(p1.validate(), null);

  // invalid
  // -------
  var doc2 = {
    title: 42,
    isPublished: 'yes please',
    publishedAt: 'hello'
  };
  var p2 = new Belt.Model(doc2, postSchema);
  var err = {
    title: "must be a String",
    body: "required",
    isPublished: "must be a Boolean",
    publishedAt: "must be a Date"
  };
  t.equal(p2.validate(), err);
});

Tinytest.add('belt - model - schema', function (t) {
  var doc1 = {
    title: "Hello World",
    body: "Post Body",
    publishedAt: new Date()
  };
  var p = new Belt.Model(doc1, postSchema);
  p.populate({extra: 'new stuff'});
  // won't show up because the extra property is not present in the schema
 
  t.equal(p.extra, undefined);

  // add to schema
  p.schema({extra: String});
  // it will show up now because it's been added to the schema
  p.populate({extra: 'new stuff'});
  t.equal(p.extra, 'new stuff');
});
