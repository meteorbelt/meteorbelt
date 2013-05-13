// Should create the correct slug
Tinytest.add("belt - slug - get", function (test) {
  // TODO add more values
  var maps = [
    {start: 'Make Slug', end: 'make-slug'},
    {start: 'remove a in as like of off ok', end: 'remove-ok'},
    {start: 'ÀÆ', end: 'aae'}
  ];
  var i;
  for (i = 0; i < maps.length; i += 1) {
    test.equal(Belt.Slug.get(maps[i].start), maps[i].end);
  }
});

var Model = new Meteor.Collection('model');

Tinytest.add("belt - slug - unique", function (test) {

  var start, slug, ids = [];

  start = 'Make slug';
  slug = Belt.Slug.unique(start, Model);
  test.equal(slug, 'make-slug');
  // Save the collection.
  ids[0] = Model.insert({slug: slug});

  // slug should now have a `-1`
  slug = Belt.Slug.unique(start, Model);
  test.equal(slug, 'make-slug-1');
  ids[1] = Model.insert({slug: slug});

  // slug should now have a `-1-1`
  slug = Belt.Slug.unique(start, Model);
  test.equal(slug, 'make-slug-1-1');

  // Should throw an error if the slug is in use
  test.throws(function () {
    slug = Belt.Slug.unique(start, Model, true);
  });

  // You must provide text to slug
  test.throws(function () {
    Belt.Slug.unique();
  });

  // You must provide a Collection
  test.throws(function () {
    Belt.Slug.unique(start);
  });
  // cleanup
  Model.remove(ids[0]);
  Model.remove(ids[1]);
});
