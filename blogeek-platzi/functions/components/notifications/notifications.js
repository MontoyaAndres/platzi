const admin = require("firebase-admin");

class Notifications {
  tokenRegisterTopic(token) {
    const registerTokens = [token];

    return admin
      .messaging()
      .subscribeToTopic(registerTokens, "NewPosts")
      .then(() => console.log("token registered"))
      .catch(err => {
        console.error(err);
      });
  }

  sendNotification(title, description, topic, type) {
    const sendTopic = topic === null ? "NewPosts" : topic;

    const message = {
      data: {
        title,
        description,
        type
      },
      topic: sendTopic
    };

    return admin
      .messaging()
      .send(message)
      .then(() => console.log("Message sent"))
      .catch(err => {
        console.error(err);
      });
  }

  sendNotificationToToken(title, description, type, token) {
    const message = {
      data: {
        title,
        description,
        type
      },
      token
    };

    return admin
      .messaging()
      .send(message)
      .catch(err => console.error(err));
  }
}

exports.Notifications = Notifications;
