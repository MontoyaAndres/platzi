"use strict";

function indexView(request, h) {
  return h.view("index", {
    title: "home",
    user: request.state.user
  });
}

function registerView(request, h) {
  if (request.state.user) {
    return h.redirect("/");
  }

  return h.view("register", { title: "Register", user: request.state.user });
}

function loginView(request, h) {
  if (request.state.user) {
    return h.redirect("/");
  }

  return h.view("login", { title: "Entrar", user: request.state.user });
}

module.exports = {
  indexView,
  registerView,
  loginView
};
