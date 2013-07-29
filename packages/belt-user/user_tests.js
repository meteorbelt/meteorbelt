var users = [{
  // 0
  username: 'bond',
  profile: {
    name: 'James Bond'
  },
  emails: [{
    address: 'bond@example.com'
  }]
}, {
  // 1
  username: 'bond',
  profile: {},
  emails: []
}, {
  // 2
  emails: [{
    address: 'bond@example.com'
  }]
}, {
  // 3
}];

Tinytest.add('belt - user - methods - displayName', function (test) {
  var expect = ['James Bond', 'bond', 'bond@example.com', 'Anonymous User'];
  _.each(users, function (obj, i) {
    var u = Meteor.users.create(obj);
    test.equal(u.displayName(), expect[i]);
  });
});
