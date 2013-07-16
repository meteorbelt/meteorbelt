// Orders
// ------
// @export Orders
Orders = new Meteor.Collection('order', {

  schema: {
    price:  { type: Number, required: true },
    status: { type: String, required: true}
  },

  statics: {
    orderAddToCart: function (opts) {
      var self = this;
    }
  },

  before: {
    update: function (userId, selector, modifier) {
      _.each(this.items, function (el) {
        // set the total price per item
        el.price.total = el.quantity * el.price.perUnit;
        // add to the total price for the order
        t = t + el.price.total;
      });
      // set the total price for the order
      this.subtotal = t;

    }
  }
});
