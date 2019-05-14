"use strict";

const Boom = require("@hapi/boom");

const { user } = require("../models");

async function createUser(request, h) {
  try {
    await user.create(request.payload);
  } catch (error) {
    console.error(error);
    return h.view("register", {
      title: "Registro",
      error: "Error creando el usuario"
    });
  }

  return h.view("register", {
    title: "Registro",
    success: "Usuario creado exitosamente"
  });
}

async function validateUser(request, h) {
  let result = "";

  try {
    result = await user.validateUser(request.payload);

    if (!result) {
      return h.view("login", {
        title: "Login",
        error: "Email y/o contraseña incorrecta"
      });
    }
  } catch (error) {
    console.error(error);
    return h.view("login", {
      title: "Login",
      error: "Problemas validando el usuario"
    });
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

function failValidation(request, h, err) {
  const templates = {
    "/create-user": "register",
    "/validate-user": "login",
    "/create-question": "ask"
  };

  return h
    .view(templates[request.path], {
      title: "Error de validación",
      error: "Por favor, complete los campos requeridos"
    })
    .code(400)
    .takeover();
}

module.exports = { createUser, validateUser, logoutUser, failValidation };
