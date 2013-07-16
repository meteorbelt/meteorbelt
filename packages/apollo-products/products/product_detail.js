Template.productDetail.helpers({
  product: function () {
    return Products.findOne({
      slug: Session.get('productSlug')
    });
  }
});

Template.productDetail.events({
  'click .add-to-cart': function (e, tmpl) {
    var quantity = tmpl.find('.product-quantity').value;
    var p = Products.findOne({
      slug: Session.get('productSlug')
    });
    var obj = {
      userId: Meteor.userId(),
      item: p,
      quantity: quantity
    };
    Meteor.call('orderAddToCart', obj, function (err) {
      if (err) {
        return Flash.error('An error occured: ', err);
      }
      return Flash.success('Item added successfully');
    });
  }
});
