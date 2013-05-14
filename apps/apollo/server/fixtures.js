var configs = [

  {
    _id: 'site',
    name: 'Apollo Site',
    descriptioin: 'Web simple',
    email: 'John Doe <john@example.com>'
  },

  {
    _id: 'analytics.google',
    code: 'UA-3880553-2'
  },

  {
    _id: 'contact',
    showAddress: true,
    address: {
      address1: '1234 1st',
      address2: '',
      city: 'New York',
      state: 'NY',
      zipcode: '00001'
    },
    phone: '(555) 111-1111',
    fax: '(555) 222-2222',
    contact: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  }

];

Meteor.startup(function () {
  if (Belt.Config.find().count() === 0) {
    _.each(configs, function (el) {
      Belt.Config.insert(el);
    });
  }
});
