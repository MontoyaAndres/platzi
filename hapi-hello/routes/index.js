"use strict";

const Joi = require("@hapi/joi");

const { indexView, registerView } = require("../controllers/site");
const { createUser } = require("../controllers/user");

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
        }
      }
    },
    path: "/create-user",
    handler: createUser
  },
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "."
      }
    }
  }
];
