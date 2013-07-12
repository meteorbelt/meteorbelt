
// Private
function init() {
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

var filepicker;

Deps.autorun(function () {
  // Only instantiate filepicker if we have an Api key
  // This maybe slower, but it's filepicker, so it should be alright
  var settings = Belt.Settings.get('inkFilepicker');
  if (settings && settings.apikey) {
    filepicker = init();
    filepicker.setKey(settings.apikey);
  }
});


// XXX ideally we would add a namespace e.g. Ink.filepicker, but filepicker
// must be using the global, because that doesn't work.
this.filepicker = filepicker;
