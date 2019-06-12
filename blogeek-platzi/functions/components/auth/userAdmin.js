const admin = require("firebase-admin");

const { Email } = require("../utils/emailHelper");
const {
  templateEmailWelcome,
  templateEmailFarewell
} = require("../utils/templateEmail");

class UserAdmin {
  registerEmailUser(name, email) {
    return admin
      .firestore()
      .collection("users")
      .add({
        name,
        email
      });
  }

  sendEmailWelcome(name, email) {
    const to = email;
    const from = "info@blogeek.com";
    const textHTML = templateEmailWelcome(name);

    const objEmail = new Email();

    return (
      objEmail.sendEmail(
        from,
        to,
        "",
        "Vídeo Blogeek - Bienvenido a la Comunidad de Vídeos Geek"
      ),
      textHTML
    );
  }

  sendEmailFarewell(name, email) {
    const to = email;
    const from = "info@blogeek.com";
    const textHTML = templateEmailFarewell(name);

    const objEmail = new Email();

    return objEmail.sendEmail(
      from,
      to,
      "",
      "Vídeo Blogeek - ¡Espera! No te vayas de la Comunidad de Vídeo Geek",
      textHTML
    );
  }
}

exports.UserAdmin = UserAdmin;
