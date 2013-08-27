Package.describe({
  summary: "Apollo Accounts. For use with Meteor Belt applications"
});

Package.on_use(function (api, where) {

  api.use(['deps', 'underscore', 'templating',
           'handlebars', 'spark', 'session'], 'client');
  api.add_files([
    'accounts/emails.html',
    'accounts/emails.js',
    'accounts/emails_item.html',
    'accounts/emails_item.js',
    'accounts/login.html',
    'accounts/login.js',
    'accounts/login_buttons.html',
    'accounts/login_buttons.js',
    'accounts/login_form.html',
    'accounts/nav.html',
    'accounts/profile.html',
    'accounts/profile.js',
    'accounts/reset_password.html',
    'accounts/reset_password.js',
    'accounts/reset_password_complete.html',
    'accounts/reset_password_complete.js',
    'accounts/settings.html',
    'accounts/settings.js',
    'accounts/signup.html',
    'accounts/signup.js',
    'accounts/signup_form.html'
  ], 'client');
});
