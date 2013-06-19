'use strict';

var Types = {
  'Date': {
    cast: function (v) {
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
      return String(v);
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
  if (undefined == Types[typeKey]) {
    throw new Error('Undefined type ' + typeKey);
  }
  return Types[typeKey];
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
  if (k.constructor && k.constructor.name === 'Object' && _.isEmpty(k)) {
    delete errorObject[key];
    return;
  }
};


var _populate = function (schema, value) {

  // Array
  if (_.isArray(schema) || Array === schema || 'array' === schema) {
    _.each(value, function (val, key) {
      value[key] = _populate(schema[0], value[key]);
    });
    return value;
  }

  // turn:
  //   String,
  //
  // into:
  //   {type: String},
  //
  if (schema.constructor.name !== 'Object') {
    schema = { type: schema };
  }

  // If we have an object, but that object does not have a type
  // we need to dig deeper.
  if (! schema.type) {
    _.each(schema, function (schemaPart, key) {
      // Only populate values that actually exist (value[key])
      // or values that have a default value (schema[key])
      var defaultIsDefined = schema[key].default !== undefined;
      if (value[key] || defaultIsDefined) {
        value[key] = _populate(schemaPart, value[key]);
      }
    });
    return value;
  }

  // Set default value
  if (schema.default && ! value) {
    // TODO: should there be a type test here?
    // If some one tries to set a default that is not the proper type.
    value = schema.default;
  }
  var type = getTypeFromKey(schema.type);
  // populate type with value
  return type.cast(value);
};

var _validate = function (schema, value) {

  var errors = {};

  if (_.isArray(schema) || Array === schema || 'array' === schema) {
    _.each(value, function (val, key) {
      errors[key] = _validate(schema[0], value[key]);
      removeEmptyErrors(errors, key);
    });
    return errors;
  }

  if (schema.constructor.name !== 'Object') {
    schema = { type: schema };
  }

  if (! schema.type) {
    _.each(schema, function (schemaPart, key) {
      var val = value ? value[key] : null;
      errors[key] = _validate(schemaPart, val);
      removeEmptyErrors(errors, key);
    });
    return errors;
  }

  if (! value) {
    if (schema.required) {
      return 'required';
    }
    return null;
  }
  var type = getTypeFromKey(schema.type);
  var valid = type.validate(value);
  if (!valid) {
    return type.message(value);
  }
  return null;
};

var populate = function (schema, doc) {
  if (schema === undefined) {
    throw new Error('You must provide a schema');
  }
  if (doc === undefined) {
    throw new Error('You must provide a doc');
  }
  return _populate(schema, doc);
};

var validate = function (schema, doc) {
  if (schema === undefined) {
    throw new Error('You must provide a schema');
  }
  if (doc === undefined) {
    throw new Error('You must provide a doc');
  }
  // return null there are no errors
  var v = _validate(schema, doc);
  return _.isEmpty(v) ? null : v;
};


// Schema
// ------

var Schema = {};

Schema.Types = Types;
Schema.populate = populate;
Schema.validate = validate;

// Exports
// -------
Belt.Schema = Schema;
