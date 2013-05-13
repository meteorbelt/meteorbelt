Tinytest.add("belt - meta - set", function (test) {
  var d;
  Belt.Meta.set('description', 'Description');
  d = document.querySelector("meta[name='description']");
  test.equal(d.content, 'Description');

  Belt.Meta.set('description', 'New Description');
  d = document.querySelector("meta[name='description']");
  test.equal(d.content, 'New Description');
});
