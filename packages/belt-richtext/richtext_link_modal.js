// XXX we shouldn't be using a global here. Find a better way.
var global = this;

Template.beltRichtextLinkModal.events({
  'click input[type="submit"]': function (e, template) {
    e.preventDefault();
    var url = template.find('input[name="link-url"]').value;
    global.beltRichtextEditorInstance.currentView.element.focus();
    global.beltRichtextEditorInstance.composer.commands.exec("createLink", {
      href: url
    });
    $('#belt-richtext-link-modal').foundation('reveal', 'close');
  },

  'click .cancel-dialog, click .close-reveal-modal': function (e) {
    e.preventDefault();
    $('#belt-richtext-link-modal').foundation('reveal', 'close');
  }
});
