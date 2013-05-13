Handlebars.registerHelper('Richtext', function (initialContent) {
  console.log('initialContent', initialContent);
  Session.set('beltRichtextContent', initialContent);
  return new Handlebars.SafeString(Template.beltRichtext());
});
