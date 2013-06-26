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

Images = new Belt.Collection('image', {
  schema: {
    name: { type: String, required: true },
    url: { type: String, required: true },
    owner: { type: String, required: true },
    tags: [String]
  }
});
