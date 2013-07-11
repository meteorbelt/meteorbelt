// XXX we shouldn't be using a global here. Find a better way.
var global = this;

Template.beltRichtextLinkDialog.events({
  'click input[type="submit"]': function (e, template) {
    e.preventDefault();
    var url = template.find('input[name="link-url"]').value;
    global.beltRichtextEditorInstance.currentView.element.focus();
    global.beltRichtextEditorInstance.composer.commands.exec("createLink", {
      href: url
    });
    $('#blet-richtext-link-dialog').modal('hide');
  },

  'click .close-reveal-modal': function (e) {
    e.preventDefault();
    $('#belt-richtext-link-dialog').modal('hide');
  }
});
