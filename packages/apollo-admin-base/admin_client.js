
var AdminPages = new Belt.Collection(null, {

  schema: {
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
      // look up setting first
      var s = this.findOne(page._id);
      if (s) {
        var id = page._id;
        delete page._id;
        this.update({ _id: id }, { $set: page });
        return; 
      }
      this.insert(page);
    }
  }
});

Belt.AdminPages = AdminPages;
