"use strict";

const { question } = require("../models");

async function createQuestion(request, h) {
  let result;

  try {
    result = await question.create(request.payload, request.state.user);
  } catch (e) {
    console.error(e);

    return h
      .view("ask", {
        title: "Crear pregunta",
        error: "Problema creado la pregunta"
      })
      .code(500)
      .takeover();
  }

  return h.response(`pregunta creada con el id ${result}`);
}

module.exports = {
  createQuestion
};
