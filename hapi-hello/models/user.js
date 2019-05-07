"use strict";

const bcrypt = require("bcrypt");

class User {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref("/");
    this.collection = this.ref.child("user");
  }

  async create(data) {
    const newUser = this.collection.push();
    data.password = await this.constructor.encrypt(data.password);
    newUser.set(data);

    return newUser;
  }

  async validateUser(data) {
    const userQuery = await this.collection
      .orderByChild("email")
      .equalTo(data.email)
      .once("value");
    const userFound = userQuery.val();

    if (userFound) {
      const userId = Object.keys(userFound)[0];
      const passwordRight = await bcrypt.compare(
        data.password,
        userFound[userId].password
      );
      const result = passwordRight ? userFound[userId] : false;

      return result;
    }

    return false;
  }

  static async encrypt(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }
}

module.exports = User;
