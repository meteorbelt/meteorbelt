
Tinytest.add('belt - schema - validate - String', function (test) {

  var s = {
    simple:     String,
    complexStr: { type: 'string' },
    complex:    { type: String },
    defaultVal: { type: String, 'default': 'default' },
    required:   { type: String, required: true }
  };

  var valid = {
    simple:     'simple',
    complex:    'complex',
    complexStr: 'complexStr',
    ignore:     1234,
    required:   "i'm here"
  };

  var invalid = {
    simple:     new Date(),
    complex:    317,
    complexStr: 576,
    ignore:     'ignore'
  };

  var err = {
    simple:     'must be a String',
    complex:    'must be a String',
    complexStr: 'must be a String',
    required:   'required'
  };

  // valid
  test.equal(Belt.Schema.validate(s, valid), null);
  // invalid
  test.equal(Belt.Schema.validate(s, invalid), err);
});

Tinytest.add('belt - schema - validate - Number', function (test) {

  var s = {
    simple:     Number,
    complexStr: { type: 'number' },
    complex:    { type: Number },
    defaultVal: { type: Number, 'default': 530 },
    required:   { type: Number, required: true }
  };

  var valid = {
    simple:     1.23,
    complex:    45.6,
    complexStr: 789,
    ignore:     true,
    required:   3.14 
  };

  var invalid = {
    simple:     new Date(),
    complex:    false,
    complexStr: true,
    ignore:     'ignore'
  };

  var err = {
    simple:     'must be a Number',
    complex:    'must be a Number',
    complexStr: 'must be a Number',
    required:   'required'
  };

  // valid
  test.equal(Belt.Schema.validate(s, valid), null);
  // invalid
  test.equal(Belt.Schema.validate(s, invalid), err);
});

Tinytest.add('belt - schema - validate - Date', function (test) {

  var s = {
    simple:     Date,
    complexStr: { type: 'date' },
    complex:    { type: Date },
    defaultVal: { type: Date, 'default': new Date('1/1/2001') },
    required:   { type: Date, required: true }
  };

  var valid = {
    simple:     new Date('1/1/2001'),
    complex:    new Date('1/1/2001'),
    complexStr: new Date('1/1/2001'),
    ignore:     true,
    required:   new Date('1/1/2001')
  };

  var invalid = {
    simple:     'yo yo',
    complex:    false,
    complexStr: true,
    ignore:     'ignore'
  };

  var err = {
    simple:     'must be a Date',
    complex:    'must be a Date',
    complexStr: 'must be a Date',
    required:   'required'
  };

  // valid
  test.equal(Belt.Schema.validate(s, valid), null);
  // invalid
  test.equal(Belt.Schema.validate(s, invalid), err);
});

Tinytest.add('belt - schema - validate - Boolean', function (test) {

  var s = {
    simple:      Boolean,
    complexStr:  { type: 'boolean' },
    complex:     { type: Boolean },
    defaultValT: { type: Boolean, 'default': true },
    defaultValF: { type: Boolean, 'default': false },
    required:    { type: Boolean, required: true },

    boolFalse:   Boolean,
    boolZero:    Boolean,
  };

  var valid = {
    simple:     true,
    complex:    false,
    complexStr: true,
    ignore:     'string',
    required:   true,
    boolFalse:  false,
    boolZero:   true
  };

  var invalid = {
    simple:     'yo yo',
    complex:    new Date(),
    complexStr: null,
    boolFalse: 1234,
    boolZero:  0,
    required:  null,
    ignore:    'ignore'
  };

  var err = {
    simple:    'must be a Boolean',
    complex:   'must be a Boolean',
    boolFalse: 'must be a Boolean',
    boolZero:  'must be a Boolean',
    required:  'required'
  };

  // valid
  test.equal(Belt.Schema.validate(s, valid), null);
  // invalid
  test.equal(Belt.Schema.validate(s, invalid), err);
});

Tinytest.add('belt - schema - validate - Array - simple', function (test) {

  var s = {
    simple:     Array,
    complexStr: { type: 'array' },
    complex:    { type: Array },
    defaultVal: { type: Array, 'default': ['a', 'b', 'c'] },
    required:   { type: Array, required: true }
  };

  var valid = {
    simple:     [10, '20', 30],
    complex:    [10, 20, 30],
    complexStr: ['10', '20', '30'],
    ignore:     'string',
    required:   ['yes', null, 'true']
  };

  var invalid = {
    simple:     'yo yo',
    complex:    new Date(),
    complexStr: 867,
    ignore:     'ignore'
  };

  var err = {
    simple:     'must be an Array',
    complex:    'must be an Array',
    complexStr: 'must be an Array',
    required:   'required'
  };

  // valid
  test.equal(Belt.Schema.validate(s, valid), null);
  // invalid
  test.equal(Belt.Schema.validate(s, invalid), err);
});

Tinytest.add('belt - schema - validate - Array - declarative', function (test) {

  // XXX more tests need.
  // Test various combinations of valid and invalid arrays
  
  var date = new Date('1/1/2001');

  // simple
  var s = {
    any:  [],
    str:  [String],
    num:  [Number],
    date: [Date],
    bool: [Boolean],
    req:  [{ type: String, required: true }]
  };

  // complex
  var s2 = {
    any:  [],
    str:  [{ type: String }],
    num:  [{ type: Number }],
    date: [{ type: Date }],
    bool: [{ type: Boolean }],
    req:  [{ type: String, required: true }]
  };

  var valid = {
    any:  [10, '20', 30],
    str:  ['10', '20', '30'],
    num:  [10, 20, 30],
    date: [date, date, date],
    bool: [true, false, true],
    req:  ['10', '20', '30']
  };

  var invalid = {
    any:  true,
    str:  [10, 20, 30],
    num:  ['10', '20', '30'],
    date: ['1/1/2001', '1/1/2001', '1/1/2001'],
    bool: ['yes', null, 'true']
  };

  var err = {
    any:  "must be an Array",
    str:  ["must be a String", "must be a String", "must be a String"],
    num:  ["must be a Number", "must be a Number", "must be a Number"],
    date: ["must be a Date", "must be a Date", "must be a Date"],
    bool: ["must be a Boolean", null, "must be a Boolean"],
    req:  'required'
  };

  // valid
  test.equal(Belt.Schema.validate(s, valid), null);
  test.equal(Belt.Schema.validate(s2, valid), null);
  // invalid
  test.equal(Belt.Schema.validate(s, invalid), err);
  test.equal(Belt.Schema.validate(s2, invalid), err);
});

Tinytest.add('belt - schema - validate - Object - simple', function (test) {
  var s = {
    simple:     Object,
    complex:    { type: Object },
    complexStr: { type: 'object' },
    defaultVal: { type: Object, 'default': { hello: 'world' } }
  };

  var valid = {
    simple:     { a: true, b: false, c: 'str', d: 1 },
    complex:    { a: true, b: false, c: 'str', d: 1 },
    complexStr: { a: true, b: false, c: 'str', d: 1 },
    ignore:     { peace: true }
  };

  var invalid = {
    simple:     true,
    complex:    false,
    complexStr: 0,
    ignore:     { peace: true }
  };

  var err = {
    simple:     'must be an Object',
    complex:    'must be an Object',
    complexStr: 'must be an Object'
  };

  // valid
  test.equal(Belt.Schema.validate(s, valid), null);
  // invalid
  test.equal(Belt.Schema.validate(s, invalid), err);
});

Tinytest.add('belt - schema - validate - Object - declarative', function (test) {

  // XXX more robust tests need
  // i.e.
  // test dates - removed because of IE8 complications on comparing two dates
  // test Array - require: true and defaults

  var s = {
    str:      String,
    bool:     Boolean,
    num:      Number,
    numStr:   Number,
    arrStr:   [String],
    arrNum:   [Number],
    obj:      {
      str:      String,
      bool:     Boolean,
      num:      Number,
      numStr:   Number,
      arrStr:   [String],
      arrNum:   [Number],
      obj:      {
        str:      String,
        bool:     Boolean,
        num:      Number,
        numStr:   Number,
        arrStr:   [String],
        arrNum:   [Number]
      }
    },
    // complex
    o_str:      {type: String, required: true},
    o_num:      {type: Number, required: true},
    o_numStr:   {type: Number, required: true},
    o_arr:      {type: Array, required: true},
    o_obj:      {type: Object, required:  true},
  };

  var invalid = {
    str:      1,
    bool:     'false',
    num:      '1',
    arrStr:   ['1', '2', '3'],
    arrNum:   [1, 2, 3],
    obj:      {
      str:      1,
      bool:     'true',
      num:      '1',
      arrStr:   ['1', '2', '3'],
      arrNum:   [1, 2, 3],
      obj:      {
        str:      1,
        bool:     'true',
        num:      '1',
        dateDate: '1/1/2001',
        arrStr:   ['1', '2', '3'],
        arrNum:   [1, 2, 3]
      }
    },
    // Correct values this time
    o_arr:         ["a", 'b', "c"],
    o_num:         1,
    o_obj:         {},
    o_str:         'string'
  };

  var err = {
    str:       'must be a String',
    bool:      'must be a Boolean',
    num:       'must be a Number', 
    // arrStr:    'must be an Array',
    // arrNum:    [1, 2, 3],
    // arrDate:   ['string', 'string', 'string'],
    obj: {
      str:       'must be a String',
      bool:      'must be a Boolean',
      num:       'must be a Number', 
      obj: {
        str:       'must be a String',
        bool:      'must be a Boolean',
        num:       'must be a Number'
      }
    },
    o_numStr:      "required"
  };

  // invalid
  test.equal(Belt.Schema.validate(s, invalid), err);
});

/*
Tinytest.add("belt - schema - validate - fn", function (test) {
  // TODO
  var now = (new Date());

  var mustBeThree = function (value, attr, computedState) {
    if (! value === 3) {
      return 'Value must be 3';
    }
  };

});

*/
