// @export _gaq
_gaq = _gaq || [];

if (AppSettings.findOne('googleAnalytics')) {
  _gaq.push(['_setAccount', 'UA-XXXXXXX-X']);
  _gaq.push(['_trackPageview']);


  var ga = document.createElement('script'); ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
}


// page viewed
// _gaq.push(['_trackPageview', page.path]);
