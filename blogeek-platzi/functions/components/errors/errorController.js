const functions = require("firebase-functions");

const { SMSHelper } = require("../utils/SMSHelper");

exports.handler = issue => {
  console.log(issue);

  const { issueTitle, appName } = issue;

  const numPhone = functions.config().configuration.numPhone;

  const message = `Error en al app ${appName} - ${issueTitle}`;

  return SMSHelper(message, numPhone).catch(err => {
    console.error(err);
  });
};
