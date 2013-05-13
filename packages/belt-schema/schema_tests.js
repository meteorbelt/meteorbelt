Tinytest.add('belt - schema - Belt.Schema is Global', function (test) {
  test.isTrue(typeof Belt.Schema !== 'undefined');
});

var validateTag = function (value, attr, computedState) {
  if (!_.isArray(value)) {
    return 'Tags must be an Array';
  }
};

var mustBeThree = function (value, attr, computedState) {
  if (!_.isArray(value)) {
    return 'Tags must be an Array';
  }
};
// Schemas
// -------
var now = (new Date());

var s1 = {
  str:           String,
  num:           Number,
  numStr:        Number,
  dateStr:       Date,
  dateDate:      Date,

  arrStr:        [String],

  obj:           {
    str:         String,
    num:         Number,
    numStr:      Number,
    dateStr:     Date,
    dateDate:    Date,
    obj:         {
      str:       String,
      num:       Number,
      numStr:    Number,
      dateStr:   Date,
      dateDate:  Date
    }
  },
  o_str:         {type:     String, required:  true},
  o_num:         {type:     Number, required:  true},
  o_numStr:      {type:     Number, required:  true},
  o_dateStr:     {type:     Date, required:    true},
  o_dateDate:    {type:     Date, required:    true},
  o_arr:         {type:     Array, required:   true},
  // obj:        {type:  Object, required:  true},
  // tags:       {type:  Array, fn:         validateTag},
  // onlyThree:  {type:  Number, fn:        mustBeThree},
  createdAt:  {type:  Date, default:     now}
};

// Docs
// ----
var doc1 = {
  str: 'string',
  num: 1,
  numStr: '1',
  dateStr: '1/1/2001',
  dateDate: new Date('1/1/2001'),
  arrStr: [1, 2, 3],
  onlyThree: 3,
  obj: {
    one: 1,
    two: 2
  },
  // complex
  o_str: 'one',
  o_num: 1,
  o_numStr: '1',
  o_dateStr: '1/1/2001',
  o_dateDate: new Date('1/1/2001'),
};

var out1 = {
  str: 'string',
  num: 1,
  numStr: 1,
  dateStr: new Date('1/1/2001'),
  dateDate: new Date('1/1/2001'),
  createdAt: now,
  arrStr: ['1', '2', '3'],
  onlyThree: 3,
  obj: {
    one: 1,
    two: 2
  },
  s_str: 'one',
  s_num: 1,
  s_numStr: 1,
  s_dateStr: new Date('1/1/2001'),
  s_dateDate: new Date('1/1/2001'),
};


Tinytest.add('belt - schema - populate types', function (test) {
  var t = [
    {schema: s1, doc: doc1, expect: out1}
  ];
  _.each(t, function (el, i, list) {
    var s = new Belt.Schema(el.schema);
    var actual = s.populate(el.doc);
    _.each(actual, function (val, key) {
      test.equal(actual[key], el.expect[key], 'doc: ' + (i + 1) + ' key: ' + key);
    });
  });
});

// Tinytest.add('belt - schema - types', function (test) {
//   test.equal(Belt.Schema.getType(s1.str), 'String');
//   test.equal(Belt.Schema.getType(s1.num), 'Number');
//   test.equal(Belt.Schema.getType(s1.arrStr), 'Array');
//   test.equal(Belt.Schema.getType(s1.obj), {
//     str:       'String',
//     num:       'Number',
//     numStr:    'Number',
//     dateStr:   'Date',
//     dateDate:  'Date',
//     obj: {
//       str:       'String',
//       num:       'Number',
//       numStr:    'Number',
//       dateStr:   'Date',
//       dateDate:  'Date'
//     }
//   });
//   var a = Belt.Schema.Types.Array.cast(['a']);
//   console.log('a', a);
// });
