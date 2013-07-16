// @export MD5
MD5 = {};

// hash generates a md5 hash using CryptoJS.MD5
MD5.hash = function (arguments) {
  return CryptoJS.MD5(arguments);
};

// hex is a helper function converts to hex
MD5.hex = function (arguments) {
  return MD5.hash(arguments).toString(CryptoJS.enc.Hex);
};
