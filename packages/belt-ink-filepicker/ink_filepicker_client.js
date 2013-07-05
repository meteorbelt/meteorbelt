
var filepicker = filepicker || null;

// Private
function init(key) {
  var a = document;
  var b = a.createElement("script");
  b.type = "text/javascript";
  b.async = !0;
  b.src = ("https:" === a.location.protocol ? "https:" : "http:") + "//api.filepicker.io/v1/filepicker.js";
  var c = a.getElementsByTagName("script")[0];
  c.parentNode.insertBefore(b, c);
  var d = {};
  d._queue = [];
  var e = "pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane".split(",");
  var f = function (a, b) {
      return function () {
        b.push([a, arguments]);
      };
    };
  for (var g = 0; g < e.length; g++) {
    d[e[g]] = f(e[g], d._queue);
  }
  return d;
}

if (!this.filepicker) {
  var fpioKey = 'XXXXXXXXXXXXXXXXXXXXXX';
  filepicker = init(fpioKey);
  filepicker.setKey(key);
}

this.filepicker = filepicker;
