// Image
// -----
Images = new Belt.Collection('image', {
  schema: {
    filename: { type: String, required: true },
    url:      { type: String, required: true },
    mimetype: String,
    size:     Number,
    width:    Number,
    height:   Number
  },

  methods: {
    urlBySize: function (width, height) {
      if (_.isUndefined(height)) {
        height = width;
      }
      return this.url + '/convert?w=' + width + '&h=' + height;
    }

  }
});


// Plugins
// -------

// Properties
Images.plugin(Belt.Plugins.tags);
Images.plugin(Belt.Plugins.isPublic);
Images.plugin(Belt.Plugins.owner);
// Images.plugin(Belt.Plugins.slug, { required: true, attr: "title" });

// Permissions
Images.plugin(Belt.Plugins.allowAdmin);
