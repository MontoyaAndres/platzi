"use strict";

const joi = require("@hapi/joi");
const boom = require("@hapi/boom");
const basic = require("@hapi/basic");

const { question, user } = require("../models");

module.exports = {
  name: "api-rest",
  version: "1.0.0",
  async register(server, options) {
    const prefix = options.prefix || "api";

    await server.register(basic);

    server.auth.strategy("simple", "basic", {
      validate: validateAuth
    });

    server.route({
      method: "GET",
      path: `/${prefix}/question/{key}`,
      options: {
        auth: "simple",
        validate: {
          params: {
            key: joi.string().required()
          }
        }
      },
      handler: async function(request, h) {
        let result = "";

        try {
          result = await question.getOne(request.params.key);

          if (!result) {
            return boom.notFound("No se pudo encontrar la pregunta");
          }
        } catch (error) {
          return boom.badImplementation("Hubo un error de servidor");
        }

        return result;
      }
    });

    async function validateAuth(request, username, password, h) {
      try {
        const validateUser = await user.validateUser({
          email: username,
          password
        });

        return {
          credentials: validateUser,
          isValid: validateUser !== false
        };
      } catch (error) {
        server.log("error", error);
      }
    }
  }
};
