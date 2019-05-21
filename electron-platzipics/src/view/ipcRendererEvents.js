"use strict";

const { ipcRenderer } = require("electron");

function setIpc() {
  ipcRenderer.on("pong", function(event, arg) {
    console.log(`pong`);
  });
}

function sendIpc() {
  ipcRenderer.send("ping", new Date());
}

module.exports = {
  setIpc,
  sendIpc
};
