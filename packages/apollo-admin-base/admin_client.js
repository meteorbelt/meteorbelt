
var AdminPages = new Belt.Collection(null, {

  schema: {
    id:       { type: String, required: true },
    name:     { type: String, required: true },
    url:      { type: String, required: true },
    postion:  { type: Number, 'default': 0 },
    // TODO:  add schema
    subpages: { type: Array, required: false }
  },

  statics: {
    addPage: function (page) {
      // TODO infer default values. 
      // 
      // E.g.
      // page = {
      //   id: 'googleAnalytics'
      // }
      //
      // Becomes:
      // page = {
      //   id: 'googleAnalytics',
      //   name: 'Google Analytics'.
      //   template: 'adminGoogleAnalytics'
      // }
      this.insert(page);
    }
  }
});

Belt.AdminPages = AdminPages;
