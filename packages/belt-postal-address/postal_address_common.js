

var postalAddressMixin = function (collection, options) {

  collection.schema({
    // The country. For example, USA. 
    // You can also provide the two-letter ISO 3166-1 alpha-2 country code.
    addressCountry: String,
    // The locality. E.g. Mountain View.
    addressLocality: String,
    // The region. E.g. CA.
    addressRegion: String,
    // The postal code. For example, 94043.
    postalCode: String,
    // The post offce box number for PO box addresses.
    postOfficeBoxNumber: String,
    // The street address. E.g. 1600 Amphitheatre Pkwy. 
    streetAddress: String
  });

};

var PostalAddress = Belt.Collection('PostalAddress');

PostalAddress.pluggins(postalAddressMixin);
