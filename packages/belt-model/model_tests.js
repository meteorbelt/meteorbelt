
var Posts = this.Posts = new Belt.Model("posts", {

  schema: {
    title:       { type: String, required: true },
    body:        { type: String, required: true },
    publishedAt: { type: Date, required: true },
    isPublished: { type: Boolean, default: false },
    loudTitle:   String
  },

  methods: {
    uppercaseTitle: function () {
      return this.title.toUpperCase();
    }
  },

  statics: {
    findByTitle: function (title) {
      return this.find({title: title});
    }
  },

  before: {
    insert: function (doc, user) {
      // doc.loudTitle = doc.uppercaseTitle();
      doc.loudTitle = doc.title.toUpperCase();
      // doc.publishedAt = doc.publishedAt ? new Date(doc.publishedAt) : null;
    }
  },

  after: {
    insert: function () {
    }
  }
});

if (Meteor.isServer) {
  // Allow all 
  Posts.allow({
    insert: function (userId, docs) {
      return true;
    },
    update: function (userId, docs, fields, modifier) {
      return true;
    },
    remove: function (userId, docs) {
      return true;
    }
  });
}

// Posts.before({
//   insert: function (doc, user) {
//     console.log("doc: ", doc);
//     // doc.loudTitle = doc.uppercaseTitle();
//     doc.loudTitle = doc.title.toUpperCase();
//     // doc.publishedAt = doc.publishedAt ? new Date(doc.publishedAt) : null;
//   }
// });

var Comments = this.Comments = new Belt.Model("comments");


Comments.schema({
  owner:       { type: String, required: true },
  body:        { type: String, required: true }
});

///////////
// Tests //
///////////

// Docs

var p1 = {
  title: "Hello World",
  body: "Post Body",
  publishedAt: '1/1/2001'
};

// incomplete
var p2 = {
  title: "Hello World",
  body: "Post Body",
};

var c1 = {
  title: "Original?",
  body: "Comment Body"
};

Tinytest.add('belt - model - Belt.Model is Global', function (test) {
  test.isTrue(typeof Belt.Model !== 'undefined');
});

Tinytest.add('belt - model - model created', function (t) {

  var p = Posts.create(p1);
  var c = Comments.create(c1);

  t.equal(p.title, p1.title);
  t.equal(p.body, p1.body);
  // check conversion to type
  t.equal(p.publishedAt, new Date('1/1/2001'));

  t.equal(c.title, c1.title);
  t.equal(c.body, c1.body);

  // Test defaults
  t.equal(p.isPublished, false);

});

Tinytest.add('belt - model - BaseModel validate', function (t) {
  var now = (new Date())
  var p = Posts.create(p1);
  // valid
  t.equal(p.validate(), null);
  // invalid
  p.title = 42;
  p.description = now;
  p.isPublished = 'yes please';
  p.publishedAt = 'hello';
  var err = {
    title: "must be a String",
    publishedAt: "must be a Date",
    isPublished: "must be a Boolean"
  };
  t.equal(p.validate(), err);
});

Tinytest.add('belt - model - model methods', function (t) {
  var p = Posts.create(p1);
  var c = Comments.create(c1);

  t.equal(p.uppercaseTitle(), p1.title.toUpperCase());
  t.equal(c.uppercaseTitle(), c1.title.toUpperCase());
});

Tinytest.add('belt - model - collection methods', function (t) {
  var collMethods = [
    "insert",
    "update",
    "remove",
  ];
  _.each(collMethods, function (val) {
    t.isTrue(typeof Posts[val] === 'function'); 
  });
  if (Meteor.isServer) {
    t.isTrue(typeof Posts.allow === 'function'); 
    t.isTrue(typeof Posts.deny === 'function'); 
  }
});

Tinytest.addAsync('belt - model - save invalid', function (t, onComplete) {
  var p = Posts.create(p2);
  p.save(function (err, id) {
    var errMsg = {
      error: 401,
      reason: 'Validation Error',
      details: {
        publishedAt: 'required'
      }
    };
    t.equal(err, errMsg);
    onComplete();
  });
});

Tinytest.addAsync('belt - model - save valid', function (t, onComplete) {
  var p = Posts.create(p1);
  p.publishedAt = new Date();
  p.save(function (err, id) {
    // TODO: this return value should the same for client and server. File a bug.
    if (Meteor.isServer) {
      t.equal(err, null);
    } else {
      t.equal(err, undefined);
    }
    t.isTrue(id && id.length);
    onComplete();
  });
});

// this is outside the test to avoid "test" is already defined error
// when the code twice (once on the server once on the client)
var M = new Belt.Model("test");

Tinytest.addAsync('belt - model - before after', function (t, onComplete) {

  M.schema({
    initial:      Number,
    beforeInsert: Number,
    afterInsert:  Number
  });

  M.before({
    insert: function (doc) {
      doc.beforeInsert = +(new Date());
    }
  });

  M.after({
    insert: function (doc) {
      doc.afterInsert = +(new Date());
    }
  });

  var m = M.create({initial: +(new Date())});

  if (Meteor.isServer) {
    debugger;
    M._mc.insert(m, function (err, id) {
      console.log("err: ", err);
      var mm = M.find(id).fetch();
      t.isTrue(mm.initial <= mm.beforeInsert <= mm.afterInsert);
      onComplete();
    });
  } else {
    onComplete();
  }

  // m.save(function (err, id) {
  //   console.log("m: ", m);
  //   // m = M.find().fetch();
  //   // console.log("m: ", m);
  //   t.isTrue(m.initial < m.beforeInsert < m.afterInsert);
  //   onComplete();
  // });
});

Tinytest.add('belt - model - restricted access', function (t) {

});

