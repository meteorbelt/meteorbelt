Template.adminProductList.helpers({
  allProducts: function () {
    return Products.find();
  }
});
