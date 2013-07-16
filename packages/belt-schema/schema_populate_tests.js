
Tinytest.add('belt - schema - Schema is Global', function (test) {
  test.isTrue(typeof Schema !== 'undefined');
});

Tinytest.add('belt - schema - null values', function (test) {

  // XXX is this desired result?
  // Or should we be removing properites that are null?

  var s = {
    str:  String,
    num:  Number,
    date: Date
    // obj: {
    //   str:  String,
    //   num:  Number,
    //   date: Date
    // }
  };

  var d = {};

  var o = {
    str:  null,
    num:  null,
    date: null
    // obj: {
    //   str:  null,
    //   num:  null,
    //   date: null
    // }
  };
  test.equal(Schema.populate(s, d), o);
});

Tinytest.add('belt - schema - populate - String', function (test) {
  var s = {
    simple:     String,
    complex:    { type: String },
    complexStr: { type: 'string' },
    cast:       String,
    defaultVal: { type: String, 'default': 'default' }
  };

  var d = {
    simple:     'simple',
    complex:    'complex',
    complexStr: 'complexStr',
    cast:       1,
    ignore:     'ignore'
  };

  var o = {
    simple:     'simple',
    complex:    'complex',
    complexStr: 'complexStr',
    cast:       '1',
    defaultVal: 'default'
  };

  test.equal(Schema.populate(s, d), o);
});

Tinytest.add('belt - schema - populate - Number', function (test) {
  var s = {
    simple:     Number,
    complex:    { type: Number },
    complexStr: { type: 'number' },
    cast:       Number,
    defaultVal: { type: Number, 'default': 188 }
  };

  var d = {
    simple:     42,
    complex:    36,
    complexStr: 72,
    cast:       '144',
    ignore:     1010
  };

  var o = {
    simple:     42,
    complex:    36,
    complexStr: 72,
    cast:       144,
    defaultVal: 188
  };

  test.equal(Schema.populate(s, d), o);
});

Tinytest.add('belt - schema - populate - Date', function (test) {

  var now = new Date();

  var s = {
    simple:     Date,
    complex:    { type: Date },
    complexStr: { type: 'date' },
    cast:       Date,
    defaultVal: { type: Date, 'default': now }
  };

  var d = {
    simple:     new Date('1/1/2001'),
    complex:    new Date('1/2/2001'),
    complexStr: new Date('1/3/2001'),
    cast:       '1/4/2001',
    ignore:     new Date('1/5/2001')
  };
            
  var o = {
    simple:     new Date('1/1/2001'),
    complex:    new Date('1/2/2001'),
    complexStr: new Date('1/3/2001'),
    cast:       new Date('1/4/2001'),
    defaultVal: now
  };

  // verbosity necessary because IE will not compare dates
  var r =  Schema.populate(s, d);
  _.each(r, function (val, key) {
    test.equal(val.toString(), o[key].toString());
  });
});

Tinytest.add('belt - schema - populate - Boolean', function (test) {

  var now = new Date();

  var s = {
    simple:      Boolean,
    complex:     { type: Boolean },
    complexStr:  { type: 'boolean' },
    castT:       Boolean,
    castF:       Boolean,
    defaultValT: { type: Boolean, 'default': true },
    defaultValF: { type: Boolean, 'default': false }
  };

  var d = {
    simple:     false,
    complex:    true,
    complexStr: false,
    castT:      'true',
    // only null will cast to false
    castF:   null,
    ignoreT: true,
    ignoreF: false
  };

  var o = {
    simple:      false,
    complex:     true,
    complexStr:  false,
    castT:       true,
    castF:       null,
    defaultValT: true,
    defaultValF: false
  };

  test.equal(Schema.populate(s, d), o);
});

Tinytest.add('belt - schema - populate - Array - simple', function (test) {
  var s = {
    simple:     Array,
    complex:    { type: Array },
    complexStr: { type: 'array' },
    // cast:    Array,
    defaultVal: { type: Array, 'default': ['a', 'b', 'c'] }
   
  };

  var d = {
    simple:     [10, 11, 12],
    complex:    ['one', 11, 'two'],
    complexStr: [10, 11, 12],
    ofType:     [10, 11, 12],
    // cast:    '144',
    ignore:     ['z', 'x', 'y']
  };

  var o = {
    simple:     [10, 11, 12],
    complex:    ['one', 11, 'two'],
    complexStr: [10, 11, 12],
    // cast:    144,
    defaultVal: ['a', 'b', 'c']
  };

  test.equal(Schema.populate(s, d), o);
});

Tinytest.add('belt - schema - populate - Array - declarative', function (test) {

  var date = new Date('1/1/2001');

  // simple
  var s = {
    any:  [],
    str:  [String],
    num:  [Number],
    date: [Date],
    bool: [Boolean]
  };

  // complex
  var s2 = {
    any:  [],
    str:  [{ type: String }],
    num:  [{ type: Number }],
    date: [{ type: Date }],
    bool: [{ type: Boolean }]
  };

  var d = {
    any:  [10, '20', 30],
    str:  [10, 20, 30],
    num:  ['10', '20', '30'],
    date: ['1/1/2001', '1/1/2001', '1/1/2001'],
    bool: ['yes', null, 'true']
  };

  var o = {
    any:  [10, '20', 30],
    str:  ['10', '20', '30'],
    num:  [10, 20, 30],
    date: [date, date, date],
    bool: [true, null, true]
  };

  test.equal(Schema.populate(s, d), o);
  test.equal(Schema.populate(s2, d), o);
});

/*
// Not a feature, yet.
Tinytest.add('belt - schema - populate - Array - declarative - default', function (test) {
  // default
  var s3 = {
    str: [{ type: String, 'default': ['a', 'b', 'c'] }]
  };

  var d3 = {};

  var o3 = {
    str: ['a', 'b', 'c']
  };

  test.equal(Schema.populate(s3, d3), o3);

});
*/

Tinytest.add('belt - schema - populate - Object - simple', function (test) {
  var s = {
    simple:     Object,
    complex:    { type: Object },
    complexStr: { type: 'object' },
    defaultVal: { type: Object, 'default': { hello: 'world' } }
  };

  var d = {
    simple:     { a: true, b: false, c: 'str', d: 1 },
    complex:    { a: true, b: false, c: 'str', d: 1 },
    complexStr: { a: true, b: false, c: 'str', d: 1 },
    ignore:     { peace: true }
  };

  var o = {
    simple:     { a: true, b: false, c: 'str', d: 1 },
    complex:    { a: true, b: false, c: 'str', d: 1 },
    complexStr: { a: true, b: false, c: 'str', d: 1 },
    defaultVal: { hello: 'world' }
  };

  test.equal(Schema.populate(s, d), o);

});

Tinytest.add('belt - schema - populate - Object - declarative', function (test) {

  var now = (new Date());

  var s = {
    obj:      {
      str:    String,
      bool:   Boolean,
      num:    Number,
      numStr: Number,
      arrStr: [String],
      arrNum: [Number],
      obj:    {
        str:    String,
        bool:   Boolean,
        num:    Number,
        numStr: Number,
        arrStr: [String],
        arrNum: [Number]
      }
    }
  };

  var d = {
    obj:       {
      str:    'string',
      bool:   true,
      num:    1,
      numStr: '1',
      arrStr: [1, 2, 3],
      arrNum: ['1', '2', '3'],
      obj:    {
        str:    'string',
        bool:   true,
        num:    1,
        numStr: '1',
        arrStr: [1, 2, 3],
        arrNum: ['1', '2', '3']
      }
    }
  };

  var o = {
    obj:      {
      str:    'string',
      bool:   true,
      num:    1,
      numStr: 1,
      arrStr: ['1', '2', '3'],
      arrNum: [1, 2, 3],
      obj:    {
        str:    'string',
        bool:   true,
        num:    1,
        numStr: 1,
        arrStr: ['1', '2', '3'],
        arrNum: [1, 2, 3]
      }
    }
  };

  test.equal(Schema.populate(s, d), o);

  // var t = [
  //   {schema: s, doc: d, expect: o}
  // ];
  // _.each(t, function (el, i, list) {
  //   var actual = Schema.populate(el.schema, el.doc);
  //   _.each(actual, function (val, key) {
  //     test.equal(actual[key], el.expect[key], 'doc: ' + (i + 1) + ' key: ' + key);
  //   });
  // });
});

Tinytest.add('belt - schema - populate defaults', function (test) {
  var s = {
    boolt: { type: Boolean, 'default': true },
    boolf: { type: Boolean, 'default': false },
    str:   { type: String, 'default': 'string' },
    num:   { type: Number, 'default': 1 },
    arr:   { type: Array, 'default': ['a', 2, 'c'] }
  };

  // empty doc to test defaults
  var d = {};

  var o = {
    boolt: true,
    boolf: false,
    str:   'string',
    num:   1,
    arr:   ['a', 2, 'c']
  };

  test.equal(Schema.populate(s, d), o);

  // var t = [
  //   {schema: s, doc: d, expect: o}
  // ];
  // _.each(t, function (el, i, list) {
  //   var actual = Schema.populate(el.schema, el.doc);
  //   // reverse order of each so we don't missing attributes
  //   _.each(el.expect, function (val, key) {
  //     test.equal(actual[key], el.expect[key], 'doc: ' + (i + 1) + ' key: ' + key);
  //   });
  // });
});
