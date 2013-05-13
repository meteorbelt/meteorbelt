// Collection
// ----------
var Order = this.Order = function (doc) {
    _.extend(this, doc);
  };

_.extend(Order.prototype, {
  validate: function () {
    if (!this.type) {
      return 'type required';
    }
    return true;
  },
  update: function () {
    var t = 0;
    _.each(this.items, function (el) {
      // set the total price per item
      el.price.total = el.quantity * el.price.perUnit;
      // add to the total price for the order
      t = t + el.price.total;
    });
    // set the total price for the order
    this.subtotal = t;
  }
});


// Define a Collection that uses Product as its document
var Orders = this.Orders = new Meteor.Collection('order', {
  transform: function (doc) {
    return new Order(doc);
  }
});

Orders.create = function (type) {
  return new Order({
    type: type
  });
};

// Methods
// -------
// Access Control -- verify that the user is modifying their order
// or the modification is being made by an admin.
function ownerOrAdmin(reqId, ownId) {
  if (!((ownId === reqId) || Roles.userIsInRole(reqId, 'admin'))) {
    throw new Meteor.Error(
    401, "You are not permitted to make this request");
  }
}

function validate(opts) {
  opts = opts || {};
  if (!opts.userId) {
    throw new Meteor.Error(400, 'Please provide a userId');
  }
  return opts;
}

// Public
Meteor.methods({
  orderAddToCart: function (opts) {
    opts = validate(opts);
    ownerOrAdmin(this.userId, opts.userId);
    var order = Orders.findOne({
      userId: opts.userId,
      status: 'cart'
    });
    opts.item.quantity = opts.quantity;
    if (order) {
      var o = Orders.update(id, {
        $set: {
          updatedAt: new Date()
        },
        $addToSet: {
          items: opts.item
        }
      });
      console.log('o: ', o);
    }
    var o = Orders.insert({
      status: 'cart',
      items: [opts.item],
      userId: opts.userId,
      createdAt: new Date(),
    }, function (err, id) {
      console.log('err: ', err);
      console.log('id: ', id);
    });
  }
});
