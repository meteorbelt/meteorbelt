/**
 * Very simple basic rule set
 *
 * Allows
 *    <i>, <em>, <b>, <strong>, <p>, <div>, <a href="http://foo"></a>, <br>, <span>, <ol>, <ul>, <li>
 *
 * For a proper documentation of the format check advanced.js
 */
this.wysihtml5ParserRules = {
  classes: {
    "thumbnail": 1,
    "caption": 1,
    "pull-left": 1,
    "pull-right": 1
  },

  tags: {
    h1:         {},
    h2:         {},
    h3:         {},
    strong:     {},
    b:          {},
    blockquote: {},
    i:          {},
    u:          {},
    img: {
      check_attributes: {
        width: "numbers",
        alt: "alt",
        src: "url",
        height: "numbers"
      }
    },
    em:     {},
    br:     {},
    p:      {},
    div:    {},
    span:   {},
    ul:     {},
    ol:     {},
    li:     {},
    a:      {
      //set_attributes: {
        //target: "_blank",
        //rel:    "nofollow"
      //},
      check_attributes: {
        href:   "url" // important to avoid XSS
      }
    }
  }
};
