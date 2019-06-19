const { Notifications } = require("../notifications/notifications");
const { Posts } = require("../posts/Posts");

exports.postUpdateController = dataSnapshot => {
  const notifications = new Notifications();

  if (
    dataSnapshot.before.data().published === false &&
    dataSnapshot.after.data().published === true
  ) {
    return notifications.sendNotification(
      dataSnapshot.after.data().title,
      dataSnapshot.after.data().description,
      null,
      ""
    );
  }

  return null;
};

exports.postAditController = (dataSnapshot, context) => {
  const posts = new Posts();

  return posts.registerAudit(
    context.params.idPost,
    dataSnapshot.after.data(),
    dataSnapshot.before.data()
  );
};

exports.postValidateImageController = image => {
  if (!image.name.match(/imgsposts/)) {
    return null;
  }

  if (!image.contentType.startsWith("image/")) {
    return null;
  }

  const posts = new Posts();

  return posts.validateImagePost(image).catch(err => {
    console.error(err);
  });
};

exports.sendPostWeek = topic => {
  const posts = new Posts();

  return posts.sendPostWeek(topic);
};
