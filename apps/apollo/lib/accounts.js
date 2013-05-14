// Accounts
// --------
if (typeof Accounts.emailTemplates !== 'undefined') {
  Accounts.emailTemplates.siteName = Belt.config.site.name;
  Accounts.emailTemplates.from = Belt.config.site.email;
}
