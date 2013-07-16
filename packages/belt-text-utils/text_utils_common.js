
var Text = {};

Text.camelCaseToTitle = function (text) {
  if (! text) return text;

  var newText = "";
  var chars = text.split("");

  _.each(chars, function (val, i) {
    if (_.isNumber(val)) {
      return val;
    }
    var next = chars[i + 1];
    var previous = chars[i + 1];
    if (val === val.toUpperCase()
      && i !== 0
      && !(next === val.toUpperCase())
      && previous !== " ") {

      newText += " ";
    }
    newText += chars[i];
  });

  // capitalize first letter
  if (newText) {
    return newText.charAt(0).toUpperCase() + newText.slice(1);
  }
  return newText;
};

// Exports
// -------
TextUtils = Text;
