"use strict";

const { question } = require("../models");

async function indexView(request, h) {
  let data;

  try {
    data = await question.getLast(10);
  } catch (e) {
    console.error(e);
  }

  return h.view("index", {
    title: "home",
    user: request.state.user,
    questions: data
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

function askView(request, h) {
  if (!request.state.user) {
    return h.redirect("/login");
  }

  return h.view("ask", {
    title: "Crear pregunta",
    user: request.state.user
  });
}

async function oneQuestionView(request, h) {
  let data;

  try {
    data = await question.getOne(request.params.id);

    if (!data) {
      return notFoundView(request, h);
    }
  } catch (e) {
    console.error(e);
  }

  return h.view("question", {
    title: "Detalles de la pregunta",
    user: request.state.user,
    question: data,
    key: request.params.id
  });
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
  askView,
  oneQuestionView,
  notFoundView,
  fileNotFoundView
};
