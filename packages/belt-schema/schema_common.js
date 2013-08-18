
Schema = {};

// XXX dirty hack to give IE8 Constructor functions a name property
if (typeof String.name === 'undefined') String.name = "String";
if (typeof Number.name === 'undefined') Number.name = "Number";
if (typeof Date.name === 'undefined') Date.name = "Date";
if (typeof Boolean.name === 'undefined') Boolean.name = "Boolean";
if (typeof Array.name === 'undefined') Array.name = "Array";
if (typeof Object.name === 'undefined') Object.name = "Object";

SchemaTypes = {
  'Date': {
    cast: function (v) {
      if (_.isUndefined(v) || _.isNull(v)) {
        return null;
      }
      return new Date(v);
    },
    validate: function (v) {
      // TODO: Should this allow for strings?
      // E.g. '1/1/2001' via new Date('1/1/2001');
      return _.isDate(v);
    },
    message: function (v) {
      return 'must be a Date';
    }
  },
  'Boolean': {
    cast: function (v) {
      if (_.isUndefined(v) || _.isNull(v)) {
        return null;
      }
      return Boolean(v);
    },
    validate: function (v) {
      return _.isBoolean(v);
    },
    message: function (v) {
      return 'must be a Boolean';
    }
  },
  'String': {
    cast: function (v) {
      return v ? String(v) : null;
    },
    validate: function (v) {
      return _.isString(v);
    },
    message: function (v) {
      return 'must be a String';
    }
  },
  'Number': {
    cast: function (v) {
      if (_.isUndefined(v) || _.isNull(v)) {
        return null;
      }
      return Number(v);
    },
    validate: function (v) {
      return _.isNumber(v);
    },
    message: function (v) {
      return 'must be a Number';
    }
  },
  'Array': {
    cast: function (v) {
      if (_.isArray(v)) {
        return v;
      }
      return [v];
    },
    validate: function (v) {
      return _.isArray(v);
    },
    message: function (v) {
      return 'must be an Array';
    }
  },
  // Dangerous !!! Use with caution. Input will not be validated
  // meaning that a malicious user could put whatever they want in this type.
  'Object': {
    cast: function (v) {
      return v;
    },
    validate: function (v) {
      return _.isObject(v);
    },
    message: function (v) {
      return 'must be an Object';
    }
  }
};

/**
 * getTypeFromKey returns the type object that implements the various functions
 * @param  {string || function} type the key to use to find the type interface
 * @return {Type}      the type interface
 */
var getTypeFromKey = function (type) {
  // We have constructors and strings
  if (type.name) {
    type = type.name;
  }
  // capitalize first letter
  var typeKey = type.charAt(0).toUpperCase() + type.substring(1);
  if (_.isUndefined(SchemaTypes[typeKey])) {
    throw new Error('Undefined type ' + typeKey);
  }
  return SchemaTypes[typeKey];
};

/**
 * Helper function to remove empty `Objects` and attributes
 *  
 * @param  {Objects} errorObject contains the current errors
 * @param  {String} key          represent the key to check
 * @return {null}                this function modifies the errorObject
 *                               directly so there are side effects.
 */ 
var removeEmptyErrors = function (errorObject, key) {
  var k = errorObject[key];
  // remove null errors
  if (k === null) {
    delete errorObject[key];
    return;
  }
  // remove empty objects
  if (_.isObject(k) && _.isEmpty(k)) {
    delete errorObject[key];
    return;
  }
};

function getType(thing) {
  if (thing === null) return "[object Null]"; // special case
  return Object.prototype.toString.call(thing);
}

var _populate = function (schema, value) {

  var newValues = {};

  // Array
  // E.g. []
  if (_.isArray(schema)) {
    // E.g. [String]
    if (! _.isEmpty(schema)) {
      var newArr = [];
      // iterate through the values of the array.
      // E.g. ['one', 'two', 'three']
      _.each(value, function (val) {
        // E.g. val = 'one'
        // schema[0] == String == [String][0]
        newArr.push(_populate(schema[0], val));
      });
      return newArr;
    }
    schema = Array;
  }

  // turn:
  //   String,
  //
  // into:
  //   {type: String},
  //
  if (getType(schema) !== "[object Object]") {
    schema = { type: schema };
  }
  // If we have an object, but that object does not have a type
  // we need to dig deeper.
  if (! schema.type) {
    _.each(schema, function (schemaPart, key) {

      // Only populate values that actually exist (value[key])
      // or values that have a default value (schema[key])
      // Account for:
      // - Boolean `false`
      // - Number 0
      var defaultPresent = (
           ! _.isUndefined(schema[key]['default'])
        || _.isNull(schema[key]['default']));

      var valuePresent = (value &&
        (! _.isUndefined(value[key]) || ! _.isNull(value[key])));

      if (defaultPresent || valuePresent) {
        newValues[key] = _populate(schemaPart, value[key]);
      }
    });
    return newValues;
  }

  // Set default value if the default value is defined and value is not
  if (! _.isUndefined(schema['default']) &&
    (_.isUndefined(value) || _.isNull(value))) {
    // TODO: should there be a type test here?
    // If some one tries to set a default that is not the proper type.
    value = schema['default'];
  }

  var type = getTypeFromKey(schema.type);
  // populate type with value
  return type.cast(value);
};

var _validate = function (schema, value) {

  var errors = {};

  // Array
  // E.g. []
  if (_.isArray(schema)) {

    // E.g. [String]
    if (! _.isEmpty(schema)) {
      // if the schema is required but we don't have a value
      // return 'required' to be added to the errors
      if (schema[0].required === true &&
        !(typeof value !== "undefined" && value !== null)) {
        return 'required';
      }
      var newArr = [];
      // iterate through the values of the array.
      // E.g. ['one', 'two', 'three']
      _.each(value, function (val) {
        // E.g. val = 'one'
        // schema[0] == String == [String][0]
        newArr.push(_validate(schema[0], val));
      });
      // if all of the values are null
      // E.g. [null, null, null]
      // return null
      if (! _.some(newArr)) {
        return null;
      }
      return newArr;
    }
    schema = Array;
  }

  if (getType(schema) !== "[object Object]") {
    schema = { type: schema };
  }

  if (! schema.type) {
    _.each(schema, function (schemaPart, key) {
      var val = null;
      if (! _.isNull(value) || _.isUndefinded(value)) {
        val = value[key];
      }
      errors[key] = _validate(schemaPart, val);
      removeEmptyErrors(errors, key);
    });
    return errors;
  }

  if (_.isUndefined(value) || _.isNull(value)) {
    // if the value is required return 'required'
    // otherwise just return null to show that it was checked
    if (schema.required === true) {
      return 'required';
    }
    return null;
  }
  var type = getTypeFromKey(schema.type);
  if (! type.validate(value)) {
    return type.message(value);
  }
  return null;
};

Schema.populate = function (schema, doc) {
  if (_.isUndefined(schema)) {
    throw new Error('You must provide a schema');
  }
  if (_.isUndefined(doc)) {
    throw new Error('You must provide a doc');
  }
  return _populate(schema, doc);
};

Schema.validate = function (schema, doc) {
  if (_.isUndefined(schema)) {
    throw new Error('You must provide a schema');
  }
  if (_.isUndefined(doc)) {
    throw new Error('You must provide a doc');
  }
  // return null if there are no errors
  var v = _validate(schema, doc);
  return _.isEmpty(v) ? null : v;
};
