Meteor.methods({
  contactSendEmail: function (email, name, phone, body) {
    this.unblock();

    // Validate
    if (!(name && name.length)) {
      throw new Meteor.Error(400, 'Please provide your name');
    }
    if (!(email && email.length)) {
      throw new Meteor.Error(400, 'Please provide your email address');
    }
    if (!(body && body.length)) {
      throw new Meteor.Error(400, 'Please provide a message');
    }
    // Prepare email
    var to = Belt.Settings.get('site').email;
    var from = name + ' <' + email + '>';
    var subject = 'Message from ' + name;
    body = body + '\n\n' + name + '\n' + email + '\n' + phone;

    // Send Email
    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: body
    });
  }
});
