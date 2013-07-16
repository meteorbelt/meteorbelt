// Should create the correct slug
Tinytest.add("belt - slug - generate", function (t) {
  // TODO add more values
  var maps = [
    {start: 'Make Slug', end: 'make-slug'},
    {start: 'remove a in as like of off ok', end: 'remove-ok'},
    {start: 'ÀÆ', end: 'aae'}
  ];
  var i;
  for (i = 0; i < maps.length; i += 1) {
    t.equal(Slug.generate(maps[i].start), maps[i].end);
  }
});


Tinytest.add("belt - slug - plugin", function (t) {

  var C = new Collection(null);
  
  C.schema({
    title: String
  });

  C.plugin(CollectionPlugins.slug, { ref: 'title' });

  var c = C.create({ title: 'Hello World' });

  // test slugify 
  c.slugify();
  t.equal(c.slug, 'hello-world');

  // test insert
  var cid = C.insert(c);
  var cc = C.findOne(cid);
  t.equal(cc.slug, 'hello-world');

  // test insert again
  var d =  C.create({ title: 'hello world' });
  var did = C.insert(d);
  var dd = C.findOne(did);
  t.equal(dd.slug, 'hello-world-1');

  // test insert again and again
  var e =  C.create({ title: 'hello world' });
  var eid = C.insert(e);
  var ee = C.findOne(eid);
  t.equal(ee.slug, 'hello-world-1-1');
});
