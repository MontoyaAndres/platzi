const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

const {
  userCreateController,
  userDeleteController
} = require("./components/auth/userController");
const {
  tokenCreateController
} = require("./components/notifications/notificationsController");
const {
  postUpdateController,
  postAditController,
  postValidateImageController,
  sendPostWeek
} = require("./components/posts/PostsController");
const { handler } = require("./components/errors/errorController");
const {
  sendCouponShare
} = require("./components/analytics/analyticsController");

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

admin.initializeApp();

app.post("/v1", (request, response, next) => {
  return sendPostWeek(request.body.topic)
    .then(() => {
      return response.status(200).json({
        result: true
      });
    })
    .catch(err => {
      return next(new Error(err.toString()));
    });
});

app.use((error, request, response, next) => {
  if (error) {
    return response.status(500).json({
      responseError: error.message
    });
  }

  return console.error("express error", error);
});

exports.createUser = functions.auth.user().onCreate(userCreateController);

exports.deleteUser = functions.auth.user().onDelete(userDeleteController);

exports.topicRegister = functions.firestore
  .document("/tokens/{id}")
  .onCreate(tokenCreateController);

exports.sendNotification = functions.firestore
  .document("/posts/{idPost}")
  .onUpdate(postUpdateController);

exports.auditPost = functions.firestore
  .document("/posts/{idPost}")
  .onUpdate(postAditController);

exports.validateImage = functions.storage
  .object()
  .onFinalize(postValidateImageController);

exports.sendPostsWeek = functions.https.onRequest(app);

exports.sendNewErrorAPPSMS = functions.crashlytics.issue().onNew(handler);

exports.sendRecurrentErrorAPPSMS = functions.crashlytics
  .issue()
  .onRegressed(handler);

exports.sendInfoShare = functions.analytics
  .event("share")
  .onLog(sendCouponShare);
