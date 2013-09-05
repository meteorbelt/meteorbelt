Template.adminNav.rendered = function () {
  // We want to load on the render function because we need the contents of
  // the dom, but we only want it to load once.
  if (!this.once) {
    $(document).foundation('topbar');
    this.once = true;
  }
};

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
