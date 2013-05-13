/**
 * BeltError constructor
 *
 * @param {String} msg Error message
 * @inherits Error https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error
 */

// TODO make this api compatible with Meteor.Error
function BeltError(msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.name = 'BeltError';
}

/*!
 * Inherits from Error.
 */

BeltError.prototype = new Error;

/*!
 * Package exports
 */

Belt.Error = BeltError;
