"use strict";

const path = require("path");
const hapi = require("@hapi/hapi");
const inert = require("@hapi/inert");
const vision = require("@hapi/vision");
const good = require("@hapi/good");
const goodConsole = require("@hapi/good-console");

const handlebars = require("./lib/helper");
const routes = require("./routes");
const site = require("./controllers/site");
const { setAnswerRight, getLast } = require("./lib/method");

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
    await server.register(vision);
    await server.register({
      plugin: good,
      options: {
        reporters: {
          console: [
            {
              module: goodConsole
            },
            "stdout"
          ]
        }
      }
    });

    server.method("setAnswerRight", setAnswerRight);
    server.method("getLast", getLast, {
      cache: {
        expiresIn: 1000 * 60, // 1m
        generateTimeout: 2000
      }
    });

    // Define cookie
    server.state("user", {
      ttl: 1000 * 60 * 60 * 24 * 7, // 1 week
      isSecure: process.env.NODE_ENV === "production",
      encoding: "base64json",
      isHttpOnly: true,
      strictHeader: true
    });

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: "views",
      layout: true,
      layoutPath: "views"
    });

    server.ext("onPreResponse", site.fileNotFoundView);
    server.route(routes);

    await server.start();
  } catch (err) {
    server.log("error", err);
    process.exit(1);
  }
}

process.on("unhandleRejection", error => {
  server.log("unhandleRejection", error);
});

process.on("unhandleException", error => {
  server.log("unhandleException", error);
});

init();
