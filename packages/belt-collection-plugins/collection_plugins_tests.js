
Tinytest.add('belt - collection-plugins - CollectionPlugins is Global', function (test) {
  test.isTrue(typeof CollectionPlugins !== 'undefined');
});

// fake a user Id
Meteor.default_connection._userId = '1234';

var C = new Collection(null);

Tinytest.addAsync('belt - collection-plugins - tags - save', function (t, done) {
  C.plugin(CollectionPlugins.tags);
  var c = C.create({ tags: ['one', 2, 'three']});

  // save
  c.save(function (err, id) {

    // find
    var cc = C.findOne(id)
    t.equal(cc.tags, ['one', '2', 'three']);

    // findByTag
    // found
    c = C.findByTag('one').fetch()[0];
    t.equal(cc._id, id);
    // not found
    c = C.findByTag('im not a tag').fetch()[0];
    t.isUndefined(c);

    done();
  });
});

Tinytest.addAsync('belt - collection-plugins - owner - save', function (t, done) {
  C.plugin(CollectionPlugins.owner);

  var c = C.create({});

  t.isNull(c.ownerId);
  c.save(function (err, id) {
    var cc = C.findOne(id)
    t.equal(cc.ownerId, '1234');
    done();
  });

});

Tinytest.addAsync('belt - collection-plugins - owner - insert / update', function (t, done) {
  C.plugin(CollectionPlugins.owner);

  var c = C.create({});

  t.isNull(c.ownerId);
  C.insert(c, function (err, id) {
    t.isNull(err);
    var cc = C.findOne(id)
    t.equal(cc.ownerId, '1234');
    delete cc.ownerId;
    C.update(id, { $set: cc }, function (err) {
      t.isUndefined(err);
      var ccc = C.findOne(id)
      t.equal(ccc.ownerId, '1234');
      done();
    });
  });

});

Tinytest.addAsync('belt - collection-plugins - createdAt - insert / update', function (t, done) {
  C.plugin(CollectionPlugins.createdAt);

  var c = C.create({});

  t.isNull(c.createdAt);

  C.insert(c, function (err, id) {
    t.isNull(err);
    var cc = C.findOne(id);
    t.isTrue(_.isDate(cc.createdAt));
    delete cc._id;

    C.update(id, { $set: cc }, function (err) {
      t.isUndefined(err);
      var ccc = C.findOne(id);
      t.equal(cc.createdAt, ccc.createdAt);
      done();
    });
  });

});

Tinytest.addAsync('belt - collection-plugins - updateAt - insert / update', function (t, done) {
  C.plugin(CollectionPlugins.updatedAt);

  var c = C.create({});

  t.isNull(c.updatedAt);

  C.insert(c, function (err, id) {
    t.isNull(err);
    var cc = C.findOne(id);
    var initUpdated = cc.updateAt;
    t.isTrue(_.isDate(cc.updatedAt));
    delete cc._id;

    // wait a bit
    var update = function () {
      C.update(id, { $set: cc }, function (err) {
        t.isUndefined(err);
        var ccc = C.findOne(id);
        t.isTrue(cc.updatedAt !== ccc.updatedAt);
        done();
      });
    };
    Meteor.setTimeout(update, 10);

  });

});

Tinytest.add('belt - collection-plugins - isPublic', function (t) {
  // TODO
});
