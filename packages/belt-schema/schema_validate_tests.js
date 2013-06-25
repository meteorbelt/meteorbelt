/////////////
// helpers //
/////////////

var now = (new Date());

var mustBeThree = function (value, attr, computedState) {
  if (! value === 3) {
    return 'Value must be 3';
  }
};

// empty doc to test requires
var doc3 = {};

var out3 = {
  o_arr:         "required",
  o_dateDate:    "required",
  o_dateStr:     "required",
  o_num:         "required",
  o_numStr:      "required",
  o_obj:         "required",
  o_str:         "required"
};

// test invalid types
// XXX Array's are not being validated
var doc4 = {
  str:      1,
  bool:     'false',
  num:      '1',
  dateDate: '1/1/2001',
  arrStr:   ['1', '2', '3'],
  arrNum:   [1, 2, 3],
  arrDate:  ['string', 'string', 'string'],
  obj:      {
    str:      1,
    bool:     'true',
    num:      '1',
    dateDate: '1/1/2001',
    arrStr:   ['1', '2', '3'],
    arrNum:   [1, 2, 3],
    arrDate:  ['string', 'string', 'string'],
    obj:      {
      str:      1,
      bool:     'true',
      num:      '1',
      dateDate: '1/1/2001',
      arrStr:   ['1', '2', '3'],
      arrNum:   [1, 2, 3],
      arrDate:  ['string', 'string', 'string']
    }
  },
  // Correct values this time
  o_arr:         ["a", 'b', "c"],
  o_dateDate:    now,
  o_num:         1,
  o_obj:         {},
  o_str:         'string'
};

var out4 = {
  str:       'must be a String',
  bool:      'must be a Boolean',
  num:       'must be a Number', 
  dateDate:  'must be a Date',
  // arrStr:    'must be an Array',
  // arrNum:    [1, 2, 3],
  // arrDate:   ['string', 'string', 'string'],
  obj: {
    str:       'must be a String',
    bool:      'must be a Boolean',
    num:       'must be a Number', 
    dateDate:  'must be a Date',
    obj: {
      str:       'must be a String',
      bool:      'must be a Boolean',
      num:       'must be a Number',
      dateDate:  'must be a Date'
    }
  },
  o_dateStr:     "required",
  o_numStr:      "required"
};

// Tinytest.add("belt - schema - validate no error", function (test) {

//   var s = {
//     str:      String,
//     optional: String,
//     boolf:    { type: Boolean, required: true }
//   };

//   var d = {
//     str:   'hello',
//     boolf: false
//   };

//   // no errors should return null
//   test.equal(Belt.Schema.validate(s, d), null);
// });

// Tinytest.add('belt - schema - validate', function (test) {
//   var t = [
//     {schema: s1, doc: doc3, expect: out3},
//     {schema: s1, doc: doc4, expect: out4}
//   ];
//   _.each(t, function (el, i, list) {
//     var actual = Belt.Schema.validate(el.schema, el.doc);
//     _.each(actual, function (val, key) {
//       test.equal(actual[key], el.expect[key], 'doc: ' + (i + 1) + ' key: ' + key);
//     });
//     // Sanity Check -- make sure that our test isn't omitting anything
//     test.equal(actual, el.expect);
//   });
// });
