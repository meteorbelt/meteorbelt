
var Contact = Belt.Collection('contact', {
  schema: {
    name:    { type: String, required: true },
    email:   { type: String, required: true },
    phone:   String,
    message: String
  }
});


this.Contact = Contact;
