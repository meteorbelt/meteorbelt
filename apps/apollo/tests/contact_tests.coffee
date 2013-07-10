host = 'http://localhost:3000/'

x = require('casper').selectXPath

casper.options.viewportSize = {width: 1000, height: 800}


# No name
casper.start host + 'contact', ->
  @fill 'form#contact-form',
    email: 'john@example.com'
    phone: '3165551234'
    message: 'Hello!!'
  , true

# casper.waitForSelector x("//a[normalize-space(text())='Contact']"),
#   success = ->
#     @test.assertExists x("//a[normalize-space(text())='Contact']")
#     @click x("//a[normalize-space(text())='Contact']")
#   ,
#   fail = ->
#     @test.assertExists x("//a[normalize-space(text())='Contact']")

casper.waitForSelector x("//*[contains(text(), 'Please provide your name')]"),
  success = ->
    @test.assertExists x("//*[contains(text(), 'Please provide your name')]")
  ,
  fail = ->
    @test.assertExists x("//*[contains(text(), 'Please provide your name')]")

casper.then ->
  @evaluateOrDie (->
    /Please provide your namee/.test document.body.innerText
  ), 'name validation failed'


# No email
casper.then ->
  @fill 'form#contact-form',
    name: 'John Doe'
    phone: '3165551234'
    message: 'Hello!!'
  , true

casper.then ->
  @evaluateOrDie (->
    /Please provide your email address/.test document.body.innerText
  ), 'email validation failed'


# No message
casper.then ->
  @fill 'form#contact-form',
    name: 'John Doe'
    email: 'john@example.com'
    phone: '3165551234'
  , true

casper.then ->
  @evaluateOrDie (->
    /Please provide a message/.test document.body.innerText
  ), 'message validation failed'


# No email
casper.then ->
  @fill 'form#contact-form',
    name: 'John Doe'
    email: 'john@example.com'
    phone: '3165551234'
    message: 'Hello!!'
  , true
 

casper.then ->
  @evaluateOrDie (->
    /Your message was sent successfully/.test document.body.innerText
  ), 'sending message error'


casper.run ->
  @echo('message sent successfully').exit()
