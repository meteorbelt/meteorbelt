// Image
// -----
/**
  Image a class that takes a document in its constructor

    var doc = {
      name: 'Photo Name',
      url: 'http://example.com/image.png',
      owner: '123',
      tags: ['one', 'two', 'three'],
      createdAt: {Date}
    };

    var image = Image(doc);
*/
// Use Belt.Validation
_.extend(Belt.Model.prototype, Belt.Validation.mixin);

Images = Belt.Model.extend('image', {
  validation: {
    name: {
      required: true
    },
    url: {
      required: true
    },
    owner: {
      required: true
    },
    tags: {
      fn: function (value, attr, computedState) {
        if (!_.isArray(value)) {
          return 'Tags must be an Array';
        }
      }
    }
  }
});

// Define a Collection that uses Post as its document
// Images = new Meteor.Collection('image', {
//   transform: function (doc) {
//     return new Image(doc);
//   }
// });
