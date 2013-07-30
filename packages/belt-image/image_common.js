// Image
// -----
Images = new Collection('image', {
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
Images.plugin(CollectionPlugins.tags);
Images.plugin(CollectionPlugins.isPublic);
Images.plugin(CollectionPlugins.owner);
Images.plugin(CollectionPlugins.slug, { ref: "title" });

// Permissions
Images.plugin(CollectionPlugins.allowAdmin);
