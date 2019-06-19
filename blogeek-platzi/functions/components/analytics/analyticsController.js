const functions = require("firebase-functions");

const { SMSHelper } = require("../utils/SMSHelper");

exports.sendCouponShare = event => {
  const socialNetwork = event.params.method;

  console.log(event);

  const numPhone = functions.config().configuration.numPhone;

  return SMSHelper(
    `Por compartir en ${socialNetwork}, te has ganado un premio. Blogeek`,
    numPhone
  ).catch(err => {
    console.error(err);
  });
};
