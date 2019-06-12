const { UserAdmin } = require("./userAdmin");

exports.userCreateController = function(user) {
  const userAdmin = new UserAdmin();

  return userAdmin
    .sendEmailWelcome(user.displayName, user.email)
    .then(() => {
      return userAdmin.registerEmailUser(user.displayName, user.email);
    })
    .catch(err => {
      console.error(err);
    });
};

exports.userDeleteController = function(user) {
  const userAdmin = new UserAdmin();

  return userAdmin.sendEmailFarewell(user.displayName, user.email);
};
