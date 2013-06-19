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


var processPopulate = function (schema, value, fn) {

  // Array
  if (_.isArray(schema) || Array === schema || 'array' === schema) {
    _.each(value, function (val, key) {
      value[key] = processPopulate(schema[0], value[key], fn);
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
      if (value[key] || schema[key].default) {
        value[key] = processPopulate(schemaPart, value[key], fn);
      }
    });
    return value;
  }

  // populate type with value
  return fn(schema, getTypeFromKey(schema.type), value);
};

var processValidate = function (schema, value, fn) {

  var errors = {};

  if (_.isArray(schema) || Array === schema || 'array' === schema) {
    _.each(value, function (val, key) {
      errors[key] = processValidate(schema[0], value[key], fn);
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
      errors[key] = processValidate(schemaPart, val, fn);
      removeEmptyErrors(errors, key);
    });
    return errors;
  }

  return fn(schema, getTypeFromKey(schema.type), value);
};

var cast = function (schema, type, value) {
  // Set default value
  if (schema.default && ! value) {
    // TODO: should there be a type test here?
    // If some one tries to set a default that is not the proper type.
    value = schema.default;
  }
  return type.cast(value);
};

var _validate = function (schema, type, value) {
  if (! value) {
    if (schema.required) {
      return 'required';
    }
    return null;
  }
  var valid = type.validate(value);
  if (!valid) {
    return type.message(value);
  }
  return '';
};

var populate = function (schema, doc) {
  return processPopulate(schema, doc, cast);
};

var validate = function (schema, doc) {
  return processValidate(schema, doc, _validate);
};


// Schema
// ------

var Schema = Object.create(null);

Schema.Types = Types;
Schema.populate = populate;
Schema.validate = validate;

// Exports
// -------
Belt.Schema = Schema;
