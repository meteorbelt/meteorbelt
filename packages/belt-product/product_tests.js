// Should create the correct slug
Tinytest.add("belt - product - new", function (test) {
  var p = new Product();
  test.equal(p.validate(), 'name required');
  p.name = 'Eggs';
  p.description = 'Farm fresh';
  p.totalPrice = 10.33;
  p.isUnique = true;
  test.equal(p.validate(), true);
});

Tinytest.add("belt - product - create", function (test) {
  var prod = [{
    name: 'Farm fresh eggs - 1 dozen',
    description: 'No antibiotics...',
    price: {
      perUnit: 0.1875,
      unitType: 'egg'
    },
    stock: {
      totalUnits: 200
    },
    variants: [{
      name: '1 dozen',
      sku: 'egg-12',
      totalUnits: 12,
      price: {
        list: 2.25
      }
    }, {
      name: '18 eggs',
      sku: 'egg-18',
      totalUnits: 18
    }]
  }, {
    name: 'Farm fresh eggs - 18 eggs',
    description: 'No antibiotics...',
    sku: 'egg-18',
    group: 'eggs',
    price: {
      list: 4.50
    },
    stock: {
      totalUnits: 20
    }
  }, {
    name: 'Potatoes',
    description: 'fresh tubers...',
    sku: 'sput',
    group: 'eggs',
    price: {
      perUnit: 5,
      unitType: 'lbs'
    },
    stock: {
      totalUnits: 100
    }
  }, {
    name: 'Chicken -- Cornish Cross',
    groupId: 'cornishcross',
    description: 'No antibiotics...',
    price: {
      perUnit: 2.60,
      unitType: 'lbs'
    },
    totalUnits: 4.55,
    variants: {
      sku: 'chicken-cornishcross',
      details: {
        weight: 3.45,
        weigthUnits: 'lbs'
      }
    }
  }];

  var productGroups = [{
    _id: 'cornishcross'
  }];

  var p = Products.insert(prod[0]);

});
