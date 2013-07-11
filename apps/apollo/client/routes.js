// Routes
// ------
function setSession(cntx, key) {
  var slug = cntx.params.slug;
  var _id = cntx.params._id;
  var tag = cntx.params.tag;
  var sessionKey = key + 'Query';

  Session.set(key + 'Opts', {sort: [['publishedAt', 'desc']]});

  if (_id) {
    return Session.set(sessionKey, {_id: _id});
  }
  if (slug) {
    return Session.set(sessionKey, {slug: slug});
  }
  if (tag) {
    return Session.set(sessionKey, {tags: tag});
  }
  return Session.set(sessionKey, {});
}

function setSettingQuery() {
  setSession(this, 'setting');
}

function setProductQuery() {
  setSession(this, 'product');
}

function setPostQuery() {
  setSession(this, 'post');
}

function setPostId(_id) {
  Session.set('postId', _id);
}

function setUserQuery() {
  setSession(this, 'user');
}

function postCreate() {
  // Set the query to all
  Session.set('postQuery', {});
  Session.set('postOptions', {sort: [['publishedAt', 'desc']]});
}

function verifyEmailToken(token) {
  Session.set('verifyEmailToken', token);
  return this.redirect('accountEmails');
}

function pageDetail() {
  var page = this.context.params.page;
  Session.set('postQuery', {slug: page});
}

function verifyEmailToken(token) {
  Session.set('verifyEmailToken', token);
  return this.redirect('accountEmails');
}

function pageDetail() {
  var page = this.context.params.page;
  Session.set('postQuery', {slug: page});
}

// Routes
// ------

// Run before routes
Meteor.Router.beforeRouting = function () {
  // clears all seen flash messages.
  // Belt.Flash.clear();
};

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

  // Blog
  '/blog':           { to: 'postList',   and: setPostQuery },
  '/blog/:slug':     { to: 'postDetail', and: setPostQuery },
  '/blog/tags/:tag': { to: 'postTag',    and: setPostQuery },

  // Products
  '/products':           { to: 'productList',   and: setProductQuery },
  '/products/:slug':     { to: 'productDetail', and: setProductQuery },
  '/products/tags/:tag': { to: 'productList',   and: setProductQuery },

  // Admin
  '/admin':            'adminHome',
  '/admin/users':      'adminUserList',
  '/admin/users/new':  { to: 'adminUserNew',    and: setUserQuery },
  '/admin/users/:_id': { to: 'adminUserDetail', and: setUserQuery },

  '/admin/posts':           { to: 'adminPostList',   and: setPostQuery },
  '/admin/posts/new':       { to: 'adminPostCreate', and: setPostQuery },
  '/admin/posts/:_id':      { to: 'adminPostDetail', and: setPostId },
  '/admin/posts/tags/:tag': { to: 'adminPostList',   and: setPostQuery },

  '/admin/products':           { to: 'adminProductList',   and: setProductQuery },
  '/admin/products/new':       { to: 'adminProductCreate', and: setProductQuery },
  '/admin/products/:_id':      { to: 'adminProductDetail', and: setProductQuery },
  '/admin/products/tags/:tag': { to: 'adminProductList',   and: setProductQuery },

  // Page
  '/pages/:page': { to: 'pageDetail', and: pageDetail },

  '*': 'notFound'
});

// Filters
// -------
Meteor.Router.filters({
  trackRoute: function (page) {
    // TODO
    // Belt.Analytics.pageViewed(page);
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
    Belt.Flash.error('You do not have access to this page. Try logging in.');
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
    Belt.Flash.error('You must be logged in to view this page');
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
