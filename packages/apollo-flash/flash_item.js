// When the template is first created
Template.beltFlashItem.created = function () {
  // Get the ID of the error
  var id = this.data._id;
  Meteor.setTimeout(function () {
    // mark the flash as "seen" after 100 milliseconds
    Flash.Collection.update(id, {
      $set: {
        seen: true
      }
    });
  }, 100);
}
