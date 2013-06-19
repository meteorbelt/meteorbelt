// helpers
var now = (new Date());
var mustBeThree = function (value, attr, computedState) {
  if (! value === 3) {
    return 'Value must be 3';
  }
};

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
  // functions
  onlyThree:  {type: Number, fn: mustBeThree}
};

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
  // functions
  onlyThree: 3
};

var s2 = {
  bool: {type: Boolean, default: true},
  str:  {type: String, default: 'string'},
  num:  {type: Number, default: 1},
  arr:  {type: Array, default: ['a', 2, 'c']},
};

// empty doc to test defaults
var doc2 = {};

var out2 = {
  bool: true,
  str:  'string',
  num:  1,
  arr:  ['a', 2, 'c'],
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
  o_str:         "required",
};

// test invalid types
var doc4 = {
  str:       1,
  bool:      'true',
  num:       '1',
  dateDate:  '1/1/2001',
  // arrStr:    ['1', '2', '3'],
  // arrNum:    [1, 2, 3],
  // arrDate:   ['string', 'string', 'string'],
  obj:       {
    str:       1,
    // bool:      'true',
    num:       '1',
    dateDate:  '1/1/2001',
    // arrStr:    ['1', '2', '3'],
    // arrNum:    [1, 2, 3],
    // arrDate:   ['string', 'string', 'string'],
    // obj:      {
    //   str:       1,
    //   bool:      'true',
    //   num:       '1',
    //   dateDate:  '1/1/2001',
    //   arrStr:    ['1', '2', '3'],
    //   arrNum:    [1, 2, 3],
    //   arrDate:   ['string', 'string', 'string']
    // }
  },
  o_arr:         "string",
  o_dateDate:    "string",
  o_dateStr:     1,
  o_num:         "string",
  o_numStr:      "string",
  o_obj:         "string",
  o_str:         1,
};

var out4 = {
  str:       'must be a String',
  bool:      'must be a Boolean',
  num:       'must be a Number', 
  dateDate:  'must be a Date',
  // TODO how should Array validation work?
  // arrStr:    'must be an Array',
  // arrNum:    [1, 2, 3],
  // arrDate:   ['string', 'string', 'string'],
  obj: {
    str:       'must be a String',
    // TODO: Boolean is passing for some reason?
    // bool:      'must be a Boolean',
    num:       'must be a Number', 
    dateDate:  'must be a Date',
  },
  o_arr:         "must be an Array",
  o_dateDate:    "must be a Date",
  o_dateStr:     "must be a Date",
  o_num:         "must be a Number",
  o_numStr:      "must be a Number",
  o_obj:         "must be an Object",
  o_str:         "must be a String",
};

Tinytest.add('belt - schema - Belt.Schema is Global', function (test) {
  test.isTrue(typeof Belt.Schema !== 'undefined');
});

Tinytest.add('belt - schema - populate', function (test) {
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

Tinytest.add('belt - schema - populate defaults', function (test) {
  var t = [
    {schema: s2, doc: doc2, expect: out2}
  ];
  _.each(t, function (el, i, list) {
    var actual = Belt.Schema.populate(el.schema, el.doc);
    // reverse order of each so we don't missing attributes
    _.each(el.expect, function (val, key) {
      test.equal(actual[key], el.expect[key], 'doc: ' + (i + 1) + ' key: ' + key);
    });
  });
});

Tinytest.add('belt - schema - validate', function (test) {
  var t = [
    {schema: s1, doc: doc3, expect: out3},
    {schema: s1, doc: doc4, expect: out4}
  ];
  _.each(t, function (el, i, list) {
    var actual = Belt.Schema.validate(el.schema, el.doc);
    _.each(actual, function (val, key) {
      test.equal(actual[key], el.expect[key], 'doc: ' + (i + 1) + ' key: ' + key);
    });
  });
});
