// XXX we shouldn't be using a global here. Find a better way.
// This method also prevents us from having multiple instances of the editor
var global = this;

Template.beltRichtext.rendered = function () {
  // TODO the editor should not reload every time
  // Set the editor
  // id of textarea element
  global.beltRichtextEditorInstance = new wysihtml5.Editor("belt-richtext-textarea", {
    // Give the editor a name, the name will also be set as class name on the iframe and on the iframe's body
    name:                 undefined,
    // Whether the editor should look like the textarea (by adopting styles)
    style:                true,
    // Id of the toolbar element, pass false value if you don't want any toolbar logic
    // toolbar:              undefined,
    toolbar:              "belt-richtext-toolbar",
    // Whether urls, entered by the user should automatically become clickable-links
    autoLink:             true,
    // Object which includes parser rules to apply when html gets inserted via copy & paste
    // See parser_rules/*.js for examples
    parserRules:          wysihtml5ParserRules,
    // Parser method to use when the user inserts content via copy & paste
    parser:               wysihtml5.dom.parse,
    // Class name which should be set on the contentEditable element in the created sandbox iframe, can be styled via the 'stylesheets' option
    composerClassName:    "wysihtml5-editor",
    // Class name to add to the body when the wysihtml5 editor is supported
    bodyClassName:        "wysihtml5-supported",
    // By default wysihtml5 will insert a <br> for line breaks, set this to false to use <p>
    useLineBreaks:        true,
    // Array (or single string) of stylesheet urls to be loaded in the editor's iframe
    stylesheets:          [],
    // id of toolbar element
    // Placeholder text to use, defaults to the placeholder attribute on the textarea element
    placeholderText:      undefined,
    // Whether the rich text editor should be rendered on touch devices (wysihtml5 >= 0.3.0 comes with basic support for iOS 5)
    supportTouchDevices:  true,
    // Whether senseless <span> elements (empty or without attributes) should be removed/replaced with their content
    cleanUp:              true
  });
  global.beltRichtextEditorInstance.setValue(Session.get('beltRichtextContent'), true);
};

Template.beltRichtext.preserve(['.wysihtml5-sandbox']);

Deps.autorun(function (c) {
  if (Session.get('beltRichtextContent')) {
    if (global.beltRichtextEditorInstance) {
      // console.log('autorun', Session.get('beltRichtextContent'));
      var a = global.beltRichtextEditorInstance.setValue(Session.get('beltRichtextContent'), true);
      // console.log('a', a);
    }
  }
});

Template.beltRichtext.helpers({
  showLinkDialog: function () {
    return Session.get('showLinkDialog');
  }
});
