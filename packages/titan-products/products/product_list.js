Template.productList.allProducts = function () {
  //Session.set('page.title', 'Products');
  return Products.find();
};
