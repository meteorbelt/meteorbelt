Template.adminProductListItem.helpers({
});


Template.adminProductListItem.events({
  'click .delete': function (e, tmpl) {
    e.preventDefault();
    var remove = window.confirm("Are you sure you want to remove this post?");
    if (remove === true) {
      Products.remove(tmpl.data._id, function (err, post) {
        if (err) {
          return Flash.error(err.reason);
        }
        // if no error...
        console.log('post deleted successfully');
      });
    }
  }
});
