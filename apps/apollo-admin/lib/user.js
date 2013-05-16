// XXX setting _transform can cause problems in the accounts package
// In the future there will be a better way to do this.
//
// https://github.com/meteor/meteor/issues/810
Meteor.users._transform = function (doc) {
  return new Belt.User(doc);
};
