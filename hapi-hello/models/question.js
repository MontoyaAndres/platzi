"use strict";

class Question {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref("/");
    this.collection = this.ref.child("question");
  }

  async create(info, user, filename) {
    const data = {
      title: info.title,
      description: info.description,
      owser: user
    };

    if (filename) {
      data.filename = filename;
    }

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

  async answer(data, user) {
    const answer = await this.collection
      .child(data.id)
      .child("answer")
      .push();
    answer.set({ text: data.answer, user });

    return answer;
  }

  async setAnswerRight(questionId, answerId, user) {
    const query = await this.collection.child(questionId).once("value");
    const question = query.val();
    const answer = question.answer;

    if (!user.email === question.owser.email) {
      return false;
    }

    for (let key in answer) {
      answer[key].correct = key === answerId;
    }

    const update = await this.collection
      .child(questionId)
      .child("answer")
      .update(answer);

    return update;
  }
}

module.exports = Question;
