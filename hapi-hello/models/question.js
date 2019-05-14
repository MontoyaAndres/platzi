"use strict";

class Question {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref("/");
    this.collection = this.ref.child("question");
  }

  async create(data, user) {
    data.owser = user;
    const question = this.collection.push();
    question.set(data);

    return question.key;
  }

  async getLast(amount) {
    const query = await this.collection.limitToLast(amount).once("value");
    const data = query.val();

    return data;
  }

  async getOne(id) {
    const query = await this.collection.child(id).once("value");
    const data = query.val();

    return data;
  }
}

module.exports = Question;
