//
// Handlebars helpers
//
Handlebars.registerHelper('Site', function () {
  return Meteor.settings.public.site;
});

Handlebars.registerHelper('resize', function (url, width, height) {
  if (typeof height === "undefined" || (height.hash != null)) {
    height = width;
  }
  url = url + '/convert?w=' + width + '&h=' + height;
  return url;
});

Handlebars.registerHelper('timeSince', function (date) {
  if (window.moment) {
    return moment(date).fromNow();
  }
  return date;
});

Handlebars.registerHelper('formatDate', function (date, block) {
  if (window.moment) {
    var f = block.hash.format || "MMM Do, YYYY";
    return moment(new Date(date)).format(f);
  }
  return date;
});

Handlebars.registerHelper('checkError', function (err) {
  return err ? 'error' : '';
});

Handlebars.registerHelper('isActiveExact', function (pageName) {
  return pageName === Meteor.Router.page() ? 'active' : '';
});

Handlebars.registerHelper('isActive', function (pageName) {
  var pageUrl = Meteor.Router[pageName + 'Path']();
  return (window.location.pathname.indexOf(pageUrl) === 0) ? 'active' : '';
});

Handlebars.registerHelper('displayName', function (showError) {
  return Meteor.user().displayName();
});

Handlebars.registerHelper('formatMoney', function (val) {
  return accounting.formatMoney(val);
});

Handlebars.registerHelper('truncate', function (str, length, omission) {
  if (typeof omission === "undefined" || (omission.hash != null)) {
    omission = '';
  }
  if (str.length > length) {
    return str.substring(0, length - omission.length) + omission;
  }
  return str;
});

// https://github.com/wycats/handlebars.js/issues/133
Handlebars.registerHelper('join', function (items, block) {
  var delimiter = block.hash.delimiter || ",",
    start = start = block.hash.start || 0,
    len = items ? items.length : 0,
    end = block.hash.end || len,
    out = "";

  if (end > len) end = len;

  if ('function' === typeof block) {
    for (i = start; i < end; i++) {
      if (i > start) out += delimiter;
      if ('string' === typeof items[i]) out += items[i];
      else out += block(items[i]);
    }
    return out;
  } else {
    return [].concat(items).slice(start, end).join(delimiter);
  }
});
