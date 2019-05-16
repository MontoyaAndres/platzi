"use strict";

const { question } = require("../models");

async function setAnswerRight(questionId, answerId, user) {
  let result;

  try {
    result = await question.setAnswerRight(questionId, answerId, user);
  } catch (error) {
    request.log("error", error);

    return false;
  }

  return result;
}

async function getLast(amount) {
  let data;

  try {
    data = await question.getLast(amount);
  } catch (error) {
    console.error("error", error);
  }

  console.log("info", "Cache method executed");

  return data;
}

module.exports = {
  setAnswerRight,
  getLast
};
