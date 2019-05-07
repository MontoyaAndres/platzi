"use strict";

const firebase = require("firebase-admin");

// Config
const serviceAccount = require("../config/firebase.json");

// Models db
const User = require("./user");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://hapi-platzioverflow.firebaseio.com/"
});

const db = firebase.database();

module.exports = {
  user: new User(db)
};
