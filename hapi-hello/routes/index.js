"use strict";

const Joi = require("@hapi/joi");

const {
  indexView,
  registerView,
  loginView,
  notFoundView,
  askView,
  oneQuestionView
} = require("../controllers/site");
const {
  createUser,
  validateUser,
  logoutUser,
  failValidation
} = require("../controllers/user");
const {
  createQuestion,
  answerQuestion,
  setAnswerRight
} = require("../controllers/question");

module.exports = [
  {
    method: "GET",
    path: "/",
    options: {
      cache: {
        expiresIn: 1000 * 30, // 30s
        privacy: "private"
      }
    },
    handler: indexView
  },
  {
    method: "GET",
    path: "/register",
    handler: registerView
  },
  {
    method: "POST",
    options: {
      validate: {
        payload: {
          name: Joi.string()
            .required()
            .min(3),
          email: Joi.string()
            .required()
            .email(),
          password: Joi.string()
            .required()
            .min(6)
        },
        failAction: failValidation
      }
    },
    path: "/create-user",
    handler: createUser
  },
  {
    method: "GET",
    path: "/login",
    handler: loginView
  },
  {
    method: "GET",
    path: "/logout",
    handler: logoutUser
  },
  {
    method: "POST",
    options: {
      validate: {
        payload: {
          email: Joi.string()
            .required()
            .email(),
          password: Joi.string()
            .required()
            .min(6)
        },
        failAction: failValidation
      }
    },
    path: "/validate-user",
    handler: validateUser
  },
  {
    method: "GET",
    path: "/ask",
    handler: askView
  },
  {
    method: "POST",
    path: "/create-question",
    options: {
      validate: {
        payload: {
          title: Joi.string().required(),
          description: Joi.string().required(),
          image: Joi.any().optional()
        },
        failAction: failValidation
      }
    },
    handler: createQuestion
  },
  {
    method: "GET",
    path: "/question/{id}",
    handler: oneQuestionView
  },
  {
    path: "/answer-question",
    method: "POST",
    options: {
      validate: {
        payload: {
          answer: Joi.string().required(),
          id: Joi.string().required()
        },
        failAction: failValidation
      }
    },
    handler: answerQuestion
  },
  {
    method: "GET",
    path: "/answer/{questionId}/{answerId}",
    handler: setAnswerRight
  },
  {
    method: "GET",
    path: "/assets/{param*}",
    handler: {
      directory: {
        path: "."
      }
    }
  },
  {
    method: ["GET", "POST"],
    path: "/{any*}",
    handler: notFoundView
  }
];
