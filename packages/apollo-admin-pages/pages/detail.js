Template.adminPageDetail.rendered = function () {
  var page;
  if (Session.get('pageQuery'))
    page = Pages.find(Session.get('pageQuery')).fetch()[0];
  // if not page; set the page var to a new object
  if (!page)
    page = Pages.create();
  this.page = page;
  return;
};

Template.adminPageDetail.helpers({
  // page returns the current page
  page: function () {
    return Pages.findOne(Session.get('pageQuery'));
  },
  publishedCheck: function () {
    return Session.get('pagePublished') ? 'checked' : '';
  }
});

// parse a date in yyyy-mm-dd format
function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

Template.adminPageDetail.events({
  // TODO: add this.
  // 'keyup #page-title': function (e, tmpl) {
  //   // TODO mark page as dirty on #richtext-textarea, #page-tags,
  //   // #page-slug change
  //   //Session.set('pageSlug', tmpl.find("#page-title").value);
  //   Session.set('pageIsDirty', true);
  // },
  
  'click #published': function (e, tmpl) {
    var val = Session.get('pagePublished') ? false : true;
    console.log("val: ", val);
    Session.set('pagePublished', val);
  },

  'click .publish': function (e, tmpl) {
    e.preventDefault();
    
    var page = pagePopulate(tmpl.page, tmpl);
    page.isPublished = true;
    page.save(function (err, id) {
      if (err) {
        _.each(err.details, function (v, k) {
          Flash.error(k + " " + v);
        });
        return;
      }
      // if no error...
      Meteor.Router.to('adminPageList');
    });
  },

  'click .save': function (e, tmpl) {
    e.preventDefault();

    var page = pagePopulate(tmpl.page, tmpl);
    page.save(function (err, id) {
      if (err) {
        Flash.clear();
        _.each(err.details, function (v, k) {
          Flash.error(k + " " + v);
        });
        return;
      }
      // if the page is new redirect to the correct url
      if (!page._id) {
        Meteor.Router.to('adminPageDetail', id);
      }
    });
  },

  // we are using the class "cancel" instead of "close" because bootstrap
  // has special styling for the "close" class
  'click .cancel': function (e) {
    e.preventDefault();

    Meteor.Router.to('adminPageList');
    // If the page has been modified notify the user the their changes will
    // be lage
    if (this.page) {
      var exit = window.confirm("You have unsaved changes that will be lage");
      if (exit === true) {
        return Meteor.Router.to('adminPageList');
      }
    } else {
      Meteor.Router.to('adminPageList');
    }
  }
});
