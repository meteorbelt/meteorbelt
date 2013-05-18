// Tests
// -----

Tinytest.add('belt - settings - Belt.Settings is Global', function (test) {
  test.isTrue(typeof Belt.Settings !== 'undefined');
});

var settings = {
  "belt": {
    "public": {
      "site": {
        "name": "Apollo Site",
        "description": "Web simple",
        "email": "John Doe <john@example.com>"
      },
      "googleAnalytics": {
        "code": "UA-XXXXXXX-X"
      },
      "contact": {
        "showAddress": true,
        "address": {
          "address1": "1600 Pennsylvania Ave NW",
          "address2": "",
          "city": "Washington",
          "state": "DC",
          "zipcode": "20500"
        },
        "phone": "(555) 111-1111",
        "fax": "(555) 222-2222",
        "person": {
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    },
    "privateVar": {
      "first": 1
    }
  }
};

Tinytest.add('belt - settings - objectToList', function (test) {

  var r = Belt.Settings._objectToList(settings);
  var out = [{
    "public": true,
    "_id": "site",
    "name": "Apollo Site",
    "description": "Web simple",
    "email": "John Doe <john@example.com>"
  }, {
    "public": true,
    "_id": "googleAnalytics",
    "code": "UA-XXXXXXX-X"
  }, {
    "public": true,
    "_id": "contact",
    "showAddress": true,
    "address": {
      "address1": "1600 Pennsylvania Ave NW",
      "address2": "",
      "city": "Washington",
      "state": "DC",
      "zipcode": "20500"
    },
    "phone": "(555) 111-1111",
    "fax": "(555) 222-2222",
    "person": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }, {
    "public": false,
    "_id": "privateVar",
    "first": 1
  }];
  test.equal(r, out);
});

Tinytest.add('belt - settings - insertMissing', function (test) {
  // TODO better tests
  var r = Belt.Settings._insertMissing(Belt.Settings._objectToList(settings));
  var s = Belt.Settings.find().fetch();
});
