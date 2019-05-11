"use strict";

const Joi = require("@hapi/joi");

const {
  indexView,
  registerView,
  loginView,
  notFoundView
} = require("../controllers/site");
const {
  createUser,
  validateUser,
  logoutUser,
  failValidation
} = require("../controllers/user");

module.exports = [
  {
    method: "GET",
    path: "/",
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
