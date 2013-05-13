'use strict';

var valueOrDefault = function (value, default_) {
  if (!value && default_) {
    return default_;
  }
  return value;
};

var Types = {
  'Date': {
    cast: function (a, default_) {
      a = valueOrDefault(a, default_);
      return new Date(a);
    },
    validate: function (a, default_) {
      a = valueOrDefault(a, default_);
      // TODO: Should this allow for strings?
      // E.g. '1/1/2001' via new Date('1/1/2001');
      return _.isDate(a);
    }
  },
  'String': {
    cast: function (a, default_) {
      a = valueOrDefault(a, default_);
      return String(a);
    },
    validate: function (a) {
      return _.isString(a);
    }
  },
  'Number': {
    cast: function (a, default_) {
      a = valueOrDefault(a, default_);
      return Number(a);
    },
    validate: function (a) {
      return _.isNumber(a);
    }
  },
  'Mixed': {
    cast: function (a, default_) {
      a = valueOrDefault(a, default_);
      return a;
    },
    validate: function (a) {
      return true;
    }
  },
  'Array': {
    cast: function (a, default_) {
      a = valueOrDefault(a, default_);
      if (_.isArray(a)) {
        return a;
      }
      return [a];
    },
    validate: function (a) {
      return _.isArray(a);
    }
  }
};

var getType = function (obj) {
  // Turn:
  //
  //   {
  //     attr: String,
  //   }
  //
  // into:
  //
  //   {
  //     atrr: {type: String},
  //   }
  //
  if (obj.constructor.name !== 'Object') {
    obj = { type: obj };
  }

  // Get the type making sure to allow keys named "type"
  // and default to mixed if not specified.
  // { type: { type: String, default: 'freshcut' } }
  var type = obj.type && !obj.type.type
    ? obj.type
    : {};

  // Object
  if ('Object' == type.constructor.name || 'mixed' == type) {
    //return 'Mixed';
    var n = {};
    _.each(obj, function (val, key) {
      return n[key] = getType(val);
    });
    return n
  }

  // Array
  if (_.isArray(type) || Array === type || 'array' === type) {
    // if it was specified through { type } look for `cast`
    var cast = (Array === type || 'array' === type)
      ? obj.cast
      : type[0];
    //if (cast instanceof Schema) {
    //  return new Types.DocumentArray(path, cast, obj);
    //}
    if ('string' === typeof cast) {
      cast = Types[cast.charAt(0).toUpperCase() + cast.substring(1)];
    } else if (cast && (!cast.type || cast.type.type)
                    && 'Object' == cast.constructor.name
                    && Object.keys(cast).length) {
      return new Types.DocumentArray(path, new Schema(cast), obj);
    }

    //return new Types.Array.cast(path, cast || Types.Mixed, obj);
    return 'Array';
  }

  var name = 'string' === typeof type
    ? type
    : type.name;

  if (name) {
    name = name.charAt(0).toUpperCase() + name.substring(1);
  }

  //if (undefined == Types[name]) {
  //  throw new Error('Undefined type at `' + path +
  //      '`\n  Did you try nesting Schemas? ' +
  //      'You can only nest using refs or arrays.');
  //}

  return name;
};

var populate = function (schema, doc) {
  var obj = {};
  _.each(schema, function (val, key) {
    var t = val.type;
    // add defaults if empty
    if (!doc[key] && val.default) {
      doc[key] = val.default;
    }
    // cast to the proper type
    var typ = getType(schema[key]);
    obj[key] = Types[typ].cast(doc[key]);
  });
  return obj;
};

var validate = function (schema, doc) {
};

// Schema
// ------

var Schema = function (schema, options) {
  this.schema = schema;
};

_.extend(Schema.prototype, {
  populate: function (doc) {
    return populate(this.schema, doc);
  },
  validate: function (doc) {
    return validate(this.schema, doc);
  }
});

Schema.Types = Types;
Schema.getType = getType;

// Exports
// -------
Belt.Schema = Schema;
