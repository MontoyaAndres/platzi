"use strict";

function indexView(request, h) {
  return h.view("index", {
    title: "home"
  });
}

function registerView(request, h) {
  return h.view("register", { title: "Register" });
}

module.exports = {
  indexView,
  registerView
};
