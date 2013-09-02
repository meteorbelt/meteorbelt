
Template.adminNav.helpers({
  sections: function () {
    return AdminPages.find();
  }
});

Template.adminNavSections.helpers({
  activeClass: function () {
    return (window.location.pathname.indexOf(this.url) === 0) ? 'active' : '';
  }
});

Template.adminNavItem.helpers({
  activeClass: function () {
    // make reactive
    // return (window.location.pathname.indexOf(this.url) === 0) ? 'active' : '';
    return '';
  },

  name: function () {
    return this.name;
  }
});
