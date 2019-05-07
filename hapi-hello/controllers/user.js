"use strict";

const { user } = require("../models");

async function createUser(request, h) {
  let result = "";

  try {
    result = await user.create(request.payload);
  } catch (error) {
    console.error(error);
    return h.response("Problemas creando el usuario").code(500);
  }

  return h.response(`Usuario creado ID: ${result}`);
}

async function validateUser(request, h) {
  let result = "";

  try {
    result = await user.validateUser(request.payload);

    if (!result) {
      return h.response("Email y/o contraseña incorrecta").code(401);
    }
  } catch (error) {
    console.error(error);
    return h.response("Problemas validando el usuario").code(500);
  }

  // Send cookie with data
  return h.redirect("/").state("user", {
    name: result.name,
    email: result.email
  });
}

async function logoutUser(request, h) {
  return h.redirect("/login").unstate("user");
}

module.exports = { createUser, validateUser, logoutUser };
