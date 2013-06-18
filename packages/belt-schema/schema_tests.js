Tinytest.add('belt - schema - Belt.Schema is Global', function (test) {
  test.isTrue(typeof Belt.Schema !== 'undefined');
});

var mustBeThree = function (value, attr, computedState) {
  if (! value === 3) {
    return 'Value must be 3';
  }
};
// Schemas
// -------
var now = (new Date());

var s1 = {
  str:      String,
  bool:     Boolean,
  num:      Number,
  numStr:   Number,
  dateStr:  Date,
  dateDate: Date,
  arrStr:   [String],
  arrNum:   [Number],
  obj:      {
    str:      String,
    num:      Number,
    numStr:   Number,
    dateStr:  Date,
    dateDate: Date,
    arrStr:   [String],
    arrNum:   [Number],
    obj:      {
      str:      String,
      num:      Number,
      numStr:   Number,
      dateStr:  Date,
      dateDate: Date,
      arrStr:   [String],
      arrNum:   [Number]
    }
  },
  // complex
  o_str:      {type: String, required: true},
  o_num:      {type: Number, required: true},
  o_numStr:   {type: Number, required: true},
  o_dateStr:  {type: Date, required: true},
  o_dateDate: {type: Date, required: true},
  o_arr:      {type: Array, required: true},
  o_obj:      {type: Object, required:  true},
  // defaults
  d_bool: {type: Boolean, default: true},
  d_str:  {type: String, default: 'string'},
  d_num:  {type: Number, default: 1},
  d_arr:  {type: Array, default: ['a', 2, 'c']},
  // functions
  onlyThree:  {type: Number, fn: mustBeThree}
};

// Docs
// ----
var doc1 = {
  str:       'string',
  bool:      true,
  num:       1,
  numStr:    '1',
  dateStr:   '1/1/2001',
  dateDate:  new Date('1/1/2001'),
  arrStr:    [1, 2, 3],
  arrNum:    ['1', '2', '3'],
  arrDate:  [now, now, now],
  obj:       {
    str:      'string',
    bool:     true,
    num:      1,
    numStr:   '1',
    dateStr:  '1/1/2001',
    dateDate: new Date('1/1/2001'),
    arrStr:   [1, 2, 3],
    arrNum:   ['1', '2', '3'],
    arrDate:  [now, now, now],
    obj:      {
      str:      'string',
      bool:     true,
      num:      1,
      numStr:   '1',
      dateStr:  '1/1/2001',
      dateDate: new Date('1/1/2001'),
      arrStr:   [1, 2, 3],
      arrNum:   ['1', '2', '3'],
      arrDate:  [now, now, now]
    }
  },
  // complex
  o_str:      'one',
  o_num:      1,
  o_numStr:   '1',
  o_dateStr:  '1/1/2001',
  o_dateDate: new Date('1/1/2001'),
  o_arr:      [1, '2', true, now],
  o_obj:      {one: 1, two: {a: 3}},
  // defaults
  // d_bool: true,
  // d_str:  'string',
  // d_num:  1,
  // d_arr:  ['a', 2, 'c'],
  // functions
  onlyThree: 3
};

var out1 = {
  str:      'string',
  bool:     true,
  num:      1,
  numStr:   1,
  dateStr:  new Date('1/1/2001'),
  dateDate: new Date('1/1/2001'),
  arrStr:   ['1', '2', '3'],
  arrNum:   [1, 2, 3],
  arrDate:  [now, now, now],
  obj:      {
    str:      'string',
    bool:     true,
    num:      1,
    numStr:   1,
    dateStr:  new Date('1/1/2001'),
    dateDate: new Date('1/1/2001'),
    arrStr:   ['1', '2', '3'],
    arrNum:   [1, 2, 3],
    arrDate:  [now, now, now],
    obj:      {
      str:      'string',
      bool:     true,
      num:      1,
      numStr:   1,
      dateStr:  new Date('1/1/2001'),
      dateDate: new Date('1/1/2001'),
      arrStr:   ['1', '2', '3'],
      arrNum:   [1, 2, 3],
      arrDate:  [now, now, now]
    }
  },
  // complex
  o_str:      'one',
  o_num:      1,
  o_numStr:   1,
  o_dateStr:  new Date('1/1/2001'),
  o_dateDate: new Date('1/1/2001'),
  o_arr:      [1, '2', true, now],
  o_obj:      {one: 1, two: {a: 3}},
  // defaults
  d_bool: true,
  d_str:  'string',
  d_num:  1,
  d_arr:  ['a', 2, 'c'],
  // functions
  onlyThree: 3
};

var doc2 = {
  // complex
  // o_str:      'one',
  // o_num:      1,
  // o_numStr:   '1',
  // o_dateStr:  '1/1/2001',
  // o_dateDate: new Date('1/1/2001'),
  // o_arr:      [1, '2', true, now],
  // o_obj:      {one: 1, two: {a: 3}},
  // defaults
  // d_bool: true,
  // d_str:  'string',
  // d_num:  1,
  // d_arr:  ['a', 2, 'c'],
  // functions
  // onlyThree: 3
};

var out2 = {
  // complex
  o_str:      'is required',
  o_num:      'is required',
  o_numStr:   'is required',
  o_dateStr:  'is required',
  o_dateDate: 'is required',
  o_arr:      'is required',
  o_obj:      'is required',
  // defaults
  // d_bool: true,
  // d_str:  'string',
  // d_num:  1,
  // d_arr:  ['a', 2, 'c'],
  // functions
  // onlyThree: 3
};

Tinytest.add('belt - schema - populate ', function (test) {
  var t = [
    {schema: s1, doc: doc1, expect: out1}
  ];
  _.each(t, function (el, i, list) {
    var actual = Belt.Schema.populate(el.schema, el.doc);
    _.each(actual, function (val, key) {
      test.equal(actual[key], el.expect[key], 'doc: ' + (i + 1) + ' key: ' + key);
    });
  });
});

// Tinytest.add('belt - schema - validate ', function (test) {
//   var t = [
//     {schema: s1, doc: doc2, expect: out2}
//   ];
//   _.each(t, function (el, i, list) {
//     var actual = Belt.Schema.validate(el.schema, el.doc);
//     console.log("actual: ", actual);
//     _.each(actual, function (val, key) {
//       test.equal(actual[key], el.expect[key], 'doc: ' + (i + 1) + ' key: ' + key);
//     });
//   });
// });
