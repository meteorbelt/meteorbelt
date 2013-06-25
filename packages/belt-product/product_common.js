// Product
// -------

// Collection
// ----------

// A Product class that takes a document in its constructor
Products = new Belt.Collection('product', {
  schema: {
    name:        { type: String, required: true },
    description: { type: String, required: true},
    totalPrice:  { type: Number, required: true}
  }
});
