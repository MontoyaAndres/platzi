"use strict";

const { writeFileSync } = require("fs");
const { join } = require("path");
const uuid = require("uuid/v1");

const { question } = require("../models");

async function createQuestion(request, h) {
  if (!request.state.user) {
    return h.redirect("/login");
  }

  let result, filename;

  try {
    if (Buffer.isBuffer(request.payload.image)) {
      filename = `${uuid()}.png`;

      writeFileSync(
        join(__dirname, "..", "public", "uploads", filename),
        request.payload.image
      );
    }

    result = await question.create(
      request.payload,
      request.state.user,
      filename
    );
  } catch (error) {
    request.log("error", error);

    return h
      .view("ask", {
        title: "Crear pregunta",
        error: "Problema creado la pregunta"
      })
      .code(500)
      .takeover();
  }

  return h.redirect(`/question/${result}`);
}

async function answerQuestion(request, h) {
  if (!request.state.user) {
    return h.redirect("/login");
  }

  try {
    await question.answer(request.payload, request.state.user);
  } catch (error) {
    request.log("error", error);
  }

  return h.redirect(`/question/${request.payload.id}`);
}

async function setAnswerRight(request, h) {
  if (!request.state.user) {
    return h.redirect("/login");
  }

  const { questionId, answerId } = request.params;

  try {
    await request.server.methods.setAnswerRight(
      questionId,
      answerId,
      request.state.user
    );
  } catch (error) {
    request.log("error", error);
  }

  return h.redirect(`/question/${questionId}`);
}

module.exports = {
  createQuestion,
  answerQuestion,
  setAnswerRight
};
