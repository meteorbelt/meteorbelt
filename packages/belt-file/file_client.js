//
// File
//

var Files = new Meteor.Collection("files");

var File = {};

File.pick = function (settings, success, error) {
  // filepicker.pick(settings, success, error);
};

File.remove = function (fileObj, options, success, error) {
  // filepicker.remove(fileObj, options, success, error);
};

Belt.File = File;
