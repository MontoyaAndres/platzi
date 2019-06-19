const path = require("path");
const os = require("os");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const vision = require("@google-cloud/vision");

const { Notifications } = require("../notifications/notifications");
const { Email } = require("../utils/emailHelper");
const { templateVideoWeeks } = require("../utils/templateEmail");

class Posts {
  registerAudit(idPost, newPost, oldPost) {
    const refAudit = admin.firestore().collection("auditPosts");

    return refAudit
      .add({ idPost, newPost, oldPost })
      .catch(err => console.error(err));
  }

  validateImagePost(file) {
    const routeFile = file.name;

    const nameFile = path.basename(routeFile);
    const idPost = path.basename(routeFile).split(".")[0];
    const bucket = admin.storage().bucket();
    const tempRouteFile = path.join(os.tmpdir(), nameFile);
    const metadata = {
      contentType: file.contentType
    };

    const client = new vision.ImageAnnotatorClient();

    return bucket
      .file(routeFile)
      .download({ destination: tempRouteFile })
      .then(() => client.safeSearchDetection(tempRouteFile))
      .then(result => {
        console.log(result[0]);

        const adult = result[0].safeSearchAnnotation.adult;
        const medical = result[0].safeSearchAnnotation.medical;
        const spoof = result[0].safeSearchAnnotation.spoof;
        const violence = result[0].safeSearchAnnotation.violence;
        const racy = result[0].safeSearchAnnotation.racy;

        return (
          this.isAppropriate(adulto) &&
          this.isAppropriate(medical) &&
          this.isAppropriate(spoof) &&
          this.isAppropriate(violence) &&
          this.isAppropriate(racy)
        );
      })
      .then(response => {
        if (response) {
          console.log(`update post ${idPost}`);
          this.updateStatePost(idPost, true);
          return response;
        }

        return this.sendResponseImageInappropriate(idPost);
      });
  }

  isAppropriate(result) {
    return (
      result !== "POSSIBLE" && result !== "LIKELY" && result !== "VERY_LIKELY"
    );
  }

  updateStatePost(idPost, state) {
    const refAudit = admin
      .firestore()
      .collection("posts")
      .doc(idPost);

    return refAudit.update({ published: state });
  }

  sendResponseImageInappropriate(idPost) {
    console.log(`query token idPost ${idPost}`);

    return admin
      .firestore()
      .collection("posts")
      .doc(idPost)
      .get()
      .then(post => {
        console.log(post);

        if (post.data().token !== null && post.data().token !== undefined) {
          const notifications = new Notifications();

          notifications.sendNotificationToToken(
            "Imagen no permitida",
            "Tu post no se puede mostrar porque contiene contenido inapropiado.",
            "notValidatedImage",
            post.data().token
          );
        }

        return post;
      });
  }

  sendPostWeek(topicNotification) {
    const dateEnd = new Date();
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate() - 5);

    let emails = "";

    return admin
      .firestore()
      .collection("users")
      .get()
      .then(user => {
        user.forEach(email => {
          emails += `${email.data().email},`;
        });

        return emails;
      })
      .then(() =>
        admin
          .firestore()
          .collection("posts")
          .where("fecha", ">=", dateStart)
          .where("fecha", "<=", dateEnd)
          .where("published", "==", true)
          .get()
      )
      .then(posts => {
        if (!posts.empty) {
          console.log("week posts");
          const textHTML = templateVideoWeeks(posts);
          const objEmail = new Email();

          console.log(emails);

          return objEmail.sendEmail(
            "info@blogeek.co",
            emails,
            "",
            "Vídeo Blogeek - Los Vídeos Geek de la semana",
            textHTML
          );
        }

        return null;
      })
      .then(response => {
        if (response) {
          const notifications = new Notifications();

          return notifications.sendNotification(
            "Posts de la semana",
            "Ya te compartimos a tu email los posts de la semana",
            topicoNotificacion,
            "notEveryWeekPost"
          );
        }

        return null;
      });
  }
}

exports.Posts = Posts;
