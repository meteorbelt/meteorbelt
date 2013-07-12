//
// File
//

var Files = new Belt.Collection("files");

var File = {};

File.pick = function (settings, success, error) {
  // XXX check if filepicker is ready
  filepicker.pick(settings, success, error);
};

File.remove = function (fileObj, options, success, error) {
  // XXX check if filepicker is ready
  filepicker.remove(fileObj, options, success, error);
};

Belt.File = File;
