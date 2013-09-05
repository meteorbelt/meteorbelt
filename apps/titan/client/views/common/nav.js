Template.nav.rendered = function () {
  // We want to load on the render function because we need the contents of
  // the dom, but we only want it to load once.
  if (!this.once) {
    $(document).foundation('topbar');
    this.once = true;
  }
};

