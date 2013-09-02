// This function will be evaluated when the template is created
Template.adminOrderDetail.created = function () {
  // set default values
  // 'productIsDirty' indicates that the product has been modified
  Session.set('productIsDirty', false);
};

Template.adminOrderDetail.rendered = function () {};

Template.adminOrderDetail.helpers({
  product: function () {
    return Products.findOne({
      _id: Session.get('productId')
    });
  },
  productImages: function () {
    if (!Session.get('productImages')) {
      var p = Products.findOne({
        _id: Session.get('productId')
      });
      if (p) {
        Session.set('productImages', p.images);
      } else {
        Session.set('productImages', '');
      }
    }
    return Session.get('productImages');
  },
  isDirty: function () {
    return Session.get('productIsDirty');
  },
  isNew: function () {
    return Products.findOne({
      _id: Session.get('productId')
    })._id ? true : false;
  }
});

Template.adminOrderDetail.events({

  'click input[type="submit"]': function (e, tmpl) {
    e.preventDefault();
    var f = form2js('product-form');
    // convert to float
    f.price = parseFloat(f.price, 10).toFixed(2);
    f.images = Session.get('productImages');
    if (!f.name || !f.name.length) {
      return Flash.error("Please fill in name");
    }
    if (!f.description || !f.description.length) {
      return Flash.error("Please fill in the description");
    }
    var callback = function (err, id) {
        if (err) {
          return Flash.error(err.reason);
        }
        Meteor.Router.to('/admin/products');
      };
    // insert
    if (!Session.get('productId')) {
      f.slug = Slug.unique(f.name, Products);
      return Products.insert(f, callback);
    }
    // update
    return Products.update(Session.get('productId'), {
      $set: f
    }, callback);
  },

  'click .cancel': function (e) {
    e.preventDefault();
    Meteor.Router.to('/admin/products');
  }
});
