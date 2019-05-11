"use strict";

const hapi = require("@hapi/hapi");
const inert = require("@hapi/inert");
const path = require("path");
const handlebars = require("handlebars");
const vision = require("@hapi/vision");

const routes = require("./routes");
const site = require("./controllers/site");

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
    console.error(err);
    process.exit(1);
  }
}

process.on("unhandleRejection", error => {
  console.error("unhandleRejection", error.message);
});

process.on("unhandleException", error => {
  console.error("unhandleException", error.message);
});

init();
