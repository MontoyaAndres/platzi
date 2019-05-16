"use strict";

const handlebars = require("handlebars");

function registerHelper() {
  handlebars.registerHelper("answerNumber", function(answers) {
    const keys = Object.keys(answers);

    return keys.length;
  });

  handlebars.registerHelper("ifEquals", function(userOne, userTwo, options) {
    if (userOne === userTwo) {
      return options.fn(this);
    }

    return options.inverse(this);
  });

  return handlebars;
}

module.exports = registerHelper();
