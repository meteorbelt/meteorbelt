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

Tinytest.add('belt - user - methods', function (test) {
  var u;
  u = new User(users[0]);
  test.equal(u.displayName(), 'James Bond');
  test.equal(u.email(), 'bond@example.com');

  u = new User(users[1]);
  test.equal(u.displayName(), 'bond');
  test.equal(u.email(), '');

  u = new User(users[2]);
  test.equal(u.displayName(), 'bond@example.com');

  u = new User(users[3]);
  test.equal(u.displayName(), 'Anonymous User');
});
