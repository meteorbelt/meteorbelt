var product = {
  name: 'Eggs - 1 dozen',
  description: 'Free range eggs',
  price: {
    perUnit: 3.00,
    totalUnits: 1
  }
};

var user = {
  _id: '12345',
  name: 'John Doe',
  email: 'john@examle.com'
};

var order = Orders.create({
  type: 'cart',
  items: [{
    sku: 'eggs-12',
    name: 'Eggs - Doz.',
    description: 'Free range eggs',
    quantity: 2,
    price: {
      perUnit: 2.50,
      total: 0
    }
  }, {
    sku: 'eggs-18',
    name: 'Eggs - 18',
    description: 'Free range eggs',
    quantity: 1,
    price: {
      perUnit: 4.50,
      total: 0
    }
  },  {
    sku: 'chicken by the pound',
    name: 'Chicken - cornish cross',
    description: 'Free range chicken',
    quantity: 1,
    price: {
      perUnit: 15.50,
      total: 0
    }
  }],

  customer: {
    userId: user._id
  },

  subtotal: 0
});

Tinytest.add("belt - order - update should calculate subtotals", function (test) {

  // Check initial values
  test.equal(order.type, 'cart');
  test.equal(order.validate(), true);
  test.equal(order.items[0].price.total, 0);
  test.equal(order.subtotal, 0);

  // update subtotals
  order.update();
  test.equal(order.items[0].price.total, 5);
  test.equal(order.subtotal, 25);
});

Tinytest.add("belt - order - findOne should return an order object", function (test) {

  var id = Orders.insert(order, function (err) {
    test.equal(err, null);
  });

  var o = Orders.findOne(id);
  test.equal(o.type, 'cart');
  test.equal(o.items[0].price.total, 5);
  test.equal(o.subtotal, 25);

  // Clean up
  Orders.remove(id);
});
