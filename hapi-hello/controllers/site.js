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

function notFoundView(request, h) {
  return h.view("404").code(404);
  /* render other layout -> return h.view('404', {}, {layout: 'error-layout'}).code(404) */
}

function fileNotFoundView({ response }, h) {
  if (response.isBoom && response.output.statusCode === 404) {
    return h.view("404").code(404);
  }

  return h.continue;
}

module.exports = {
  indexView,
  registerView,
  loginView,
  notFoundView,
  fileNotFoundView
};
