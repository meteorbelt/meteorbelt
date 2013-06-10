// Product
// -------

// Collection
// ----------

// A Product class that takes a document in its constructor
Products = Belt.Model.extend('product', {
  // validate: function () {
  //   var err = new MultiError('ValidationError');
  //   if (!this.name) {
  //     err.add('name', 'required');
  //   }
  //   if (!this.description) {
  //     err.add('description', 'required');
  //   }
  //   if (!this.totalPrice) {
  //     err.add('totalPrice', 'required');
  //   }
  //   if (!_.isNumber(this.totalPrice)) {
  //     err.add('totalPrice', 'not number');
  //   }
  //   if (err.errors.length) {
  //     return err;
  //   }
  //   return null;
  // }
  validate: function () {
    if (!this.name) {
      return 'name required';
    }
    if (!this.description) {
      return 'description required';
    }
    if (!this.totalPrice) {
      return 'totalPrice required';
    }
    if (!_.isNumber(this.totalPrice)) {
      return 'totalPrice must be a number';
    }
    return true;
  }
});

// Define a Collection that uses Product as its document
// this.Products = new Meteor.Collection('products', {
//   transform: function (doc) {
//     return new Product(doc);
//   }
// });

