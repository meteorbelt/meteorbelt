//
// Meta
//

var meta = {};

meta.add = function (name, val) {
  var m = document.createElement('meta');
  m.name = name;
  m.content = val;
  var h = document.getElementsByTagName('head')[0];
  return h.appendChild(m);
};

meta.get = function (name) {
  return document.querySelector("meta[name=" + name + "]");
};

meta.set = function (name, val) {
  var m = meta.get(name);
  if (m) {
    return m.setAttribute('content', val);
  }
  return meta.add(name, val);
};

Meta = meta;
