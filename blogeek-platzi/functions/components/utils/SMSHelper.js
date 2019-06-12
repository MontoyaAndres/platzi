const Twilio = require("twilio");
const functions = require("firebase-functions");

exports.SMSHelper = function(message, cellphone) {
  const SID = functions.config().configuration.accountsidtwilio;
  const authToken = functions.config().configuration.authtokentwilio;

  const twilioClient = new Twilio(SID, authToken);

  return twilioClient.messages.create({
    to: cellphone,
    from: "",
    body: message
  });
};
