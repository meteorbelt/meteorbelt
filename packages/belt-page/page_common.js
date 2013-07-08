// Collection
// ----------
var Pages = new Belt.Collection('page', {
  schema: {
    title: String,
    body: String
  }
});

// Exports
// -------
this.Pages = Pages;
