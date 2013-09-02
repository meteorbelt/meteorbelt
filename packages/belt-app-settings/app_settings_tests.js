// Tests
// -----

Tinytest.add('belt - settings - AppSettings is Global', function (test) {
  test.isTrue(typeof AppSettings !== 'undefined');
});

var settings = {
  "belt": {
    "public": {
      "site": {
        "name": "Titan Site",
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

  var r = AppSettings._objectToList(settings.belt);
  var out = [{
    "_id": "site",
    "public": true,
    "data": {
      "name": "Titan Site",
      "description": "Web simple",
      "email": "John Doe <john@example.com>"
    }
  }, {
    "_id": "googleAnalytics",
    "public": true,
    "data": {
      "code": "UA-XXXXXXX-X"
    }
  }, {
    "_id": "contact",
    "public": true,
    "data": {
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
  }, {
    "_id": "privateVar",
    "public": false,
    "data": {
      "first": 1
    }
  }];
  test.equal(r, out);
});

Tinytest.add('belt - settings - insertMissing', function (test) {
  // TODO better tests
  // var r = AppSettings._insertMissing(AppSettings._objectToList(settings));
  // var s = AppSettings.find().fetch();
});
