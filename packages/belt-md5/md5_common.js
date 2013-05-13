var md5 = {};
// hash generates a md5 hash using CryptoJS.MD5
md5.hash = function (arguments) {
  return CryptoJS.MD5(arguments);
};
// hex is a helper function converts to hex
md5.hex = function (arguments) {
  return md5.hash(arguments).toString(CryptoJS.enc.Hex);
};

Belt.MD5 = md5;
