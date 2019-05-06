"use strict";

const hapi = require("@hapi/hapi");
const inert = require("@hapi/inert");
const path = require("path");
const handlebars = require("handlebars");
const vision = require("@hapi/vision");

const routes = require("./routes");

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

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: "views",
      layout: true,
      layoutPath: "views"
    });

    server.route(routes);

    await server.start();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

init();
