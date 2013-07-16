// Product
// -------
// @export Products
Products = new Collection('product', {
  schema: {
    name:        { type: String, required: true },
    description: { type: String, required: true},
    totalPrice:  { type: Number, required: true}
  }
});
