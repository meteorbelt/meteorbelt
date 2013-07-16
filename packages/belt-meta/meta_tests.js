Tinytest.add("belt - meta - set", function (test) {
  var d;
  Meta.set('description', 'Description');
  d = document.querySelector("meta[name='description']");
  test.equal(d.content, 'Description');

  Meta.set('description', 'New Description');
  d = document.querySelector("meta[name='description']");
  test.equal(d.content, 'New Description');
});
