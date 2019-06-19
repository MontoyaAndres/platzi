const { Notifications } = require("./notifications");

exports.tokenCreateController = dataSnapshot => {
  const notifications = new Notifications();

  return notifications.tokenRegisterTopic(dataSnapshot.data().token);
};
