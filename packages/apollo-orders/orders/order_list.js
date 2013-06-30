Template.orderList.helpers({
  ordersAll: function () {
    return Orders.find({
      slug: Session.get('orderQuery')
    });
  }
});
