"use strict";

const hapi = require("@hapi/hapi");
const inert = require("@hapi/inert");
const path = require("path");

const server = hapi.server({
  port: process.env.PORT || 3000,
  host: "localhost",
  routes: {
    files: {
      relativeTo: path.join(__dirname, "public")
    }
  }
});

async function init() {
  try {
    await server.register(inert);

    server.route({
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return h.file("index.html");
      }
    });

    server.route({
      method: "GET",
      path: "/{param*}",
      handler: {
        directory: {
          path: ".",
          index: ["index.html"]
        }
      }
    });

    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

init();
