// AppSettings
// -----------
AppSettings = new Collection('settings', {
  statics: {
    // convience method to return the data object
    get: function (id) {
      var r = this.findOne({_id: id});
      if (r) {
        return r.data;
      }
      return null;
    }
  }
});
