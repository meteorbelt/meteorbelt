// Routes
// ------
function setSession(cntx, key) {

  var _id = cntx.params._id;
  var slug = cntx.params.slug;
  var tag = cntx.params.tag;

  var query = {};

  if (_id)
    query._id = _id;
    Session.set(key + 'Id', _id);
    if (_id === 'new')
      Session.set(key + 'Id', null);

  if (slug)
    Session.set(key + 'Slug', slug);
    query.slug = slug;
  if (tag)
    query.tag = tag;

  Session.set(key + 'Opts', { sort: [['publishedAt', 'desc']] });
  Session.set(key + 'Query', query);
}

function setPageQuery() {
  setSession(this, 'page');
}

function setPostQuery() {
  setSession(this, 'post');
}

function setProductQuery() {
  setSession(this, 'product');
}

function verifyEmailToken(token) {
  Session.set('verifyEmailToken', token);
  return this.redirect('accountEmails');
}

var addResourceRotues = function (basePath, name, key) {

  var r = {};

  function setQuery() {
    setSession(this, key || name);
  }

  r[basePath]           = { to: name + 'List',   and: setQuery },
  r[basePath + '/:_id'] = { to: name + 'Detail', and: setQuery },

  Meteor.Router.add(r);
};

// Routes
// ------

// Run before routes
Meteor.Router.beforeRouting = function () {
  // clears all seen flash messages.
  Flash.clear();
};


addResourceRotues('/admin/settings', 'adminSetting', 'setting');
addResourceRotues('/admin/posts', 'adminPost', 'post');
addResourceRotues('/admin/pages', 'adminPage', 'page');
addResourceRotues('/admin/images', 'adminImage', 'image');
addResourceRotues('/admin/users', 'adminUser', 'user');


Meteor.Router.add({
  // Static
  '/':         'home',
  '/faq':      'faq',
  '/contact':  'contact',

  // Accounts
  '/account/signup':                   'accountSignup',
  '/account/login':                    'accountLogin',
  '/account/profile':                  'accountProfile',
  '/account/settings':                 'accountSettings',
  '/account/emails':                   'accountEmails',
  //'/account/connected':                'accountConnected',
  '/account/reset-password':           'accountResetPassword',
  '/account/reset-password/complete':  'accountResetPasswordComplete',
  '/verify-email/:token':              verifyEmailToken,

  // Admin
  '/admin': 'adminHome',

  // Blog
  '/blog':           { to: 'postList',   and: setPostQuery },
  '/blog/:slug':     { to: 'postDetail', and: setPostQuery },
  '/blog/tags/:tag': { to: 'postTag',    and: setPostQuery },

  // Products
  '/products':           { to: 'productList',   and: setProductQuery },
  '/products/:slug':     { to: 'productDetail', and: setProductQuery },
  '/products/tags/:tag': { to: 'productList',   and: setProductQuery },

  // Page
  '/pages/:slug': { to: 'pageDetail', and: setPageQuery },

  '*': 'notFound'
});

// Filters
// -------
Meteor.Router.filters({
  trackRoute: function (page) {
    // TODO
    // Analytics.pageViewed(page);
    return page;
  },
  // isAdmin filter check to see if the current user is an admin.
  // If they are not the login pages is show.
  isAdmin: function (page) {
    // TODO: this should work?
    // function willTryToLogin() {
    //   return !!(localStorage && localStorage['Meteor.userId']);
    // }
    // if the user is still loading wait until ready to check roles;
    // otherwise we will get a false negative.
    if (Meteor.loggingIn()) {
      var loggingInCheck = function () {
          if (Meteor.loggingIn()) {
            return Meteor.setTimeout(loggingInCheck, 100);
          }
        };
      // start it off
      loggingInCheck();
    }
    // Now that we have a logged in user check if they are an admin
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return page;
    }
    Flash.error('You do not have access to this page. Try logging in.');
    return 'accountLogin';
  },
  // isLoggedIn filter check to see if the current user is logged in.
  // If they are not the login pages is show.
  isLoggedIn: function (page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    }
    if (Meteor.user()) {
      return page;
    }
    Flash.error('You must be logged in to view this page');
    return 'accountLogin';
  }
});

// applies to all pages
Meteor.Router.filter('trackRoute');

// applies to account required pages
Meteor.Router.filter('isLoggedIn', {
  only: [
    'accountConnected',
    'accountEmails',
    'accountProfile',
    'accountSettings'
    //'adminHome',
    //'adminPostList',
    //'adminPostDetail',
    //'adminUserList'
  ]
});

// applies to admin pages
Meteor.Router.filter('isAdmin', {
  only: [
    //'adminHome',
    //'adminPostList',
    //'adminPostDetail',
    //'adminUserList'
  ]
});
