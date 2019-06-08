$(() => {
  $(".tooltipped").tooltip({ delay: 50 });
  $(".modal").modal();

  // Init Firebase nuevamente
  firebase.initializeApp(config);

  navigator.serviceWorker
    .register("notificaciones-sw.js")
    .then(register => {
      firebase.messaging().useServiceWorker(register);
    })
    .catch(err => {
      console.log(err);
    });

  const messaging = firebase.messaging();

  // Registrar LLave publica de messaging
  messaging.usePublicVapidKey(
    "BAlRy_raBqFLKKRm01ScKk_QMLrO-FAFue55vsXLNU1VDyhxASXuIZ8vBsPQioEwnTEYHXM3QBvSrpYODjqeYgc"
  );

  // Solicitar permisos para las notificaciones
  messaging
    .requestPermission()
    .then(() => {
      console.log("permissions accepted");

      return messaging.getToken();
    })
    .then(token => {
      console.log("token", token);

      const db = firebase.firestore();
      db.collection("tokens")
        .doc(token)
        .set({ token });
    })
    .catch(err => {
      console.error(err);
    });

  // Obtener token cuando se refresca
  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(token => {
        console.log("token refreshed");

        const db = firebase.firestore();
        db.collection("tokens")
          .doc(token)
          .set({ token });
      })
      .catch(err => {
        console.error(err);
      });
  });

  // Recibir las notificaciones cuando el usuario esta foreground
  messaging.onMessage(payload => {
    Materialize.toast(
      `Ya tenemos un nuevo post. Revísalo en ${payload.data.titulo}`,
      6000
    );
  });

  // TODO: Recibir las notificaciones cuando el usuario esta background

  const post = new Post();
  post.consultarTodosPost();

  // TODO: Firebase observador del cambio de estado
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      $("#btnInicioSesion").text("Salir");

      if (user.photoURL) {
        $("#avatar").attr("src", user.photoURL);
      } else {
        $("#avatar").attr("src", "imagenes/usuario_auth.png");
      }
    } else {
      $("#btnInicioSesion").text("Iniciar Sesión");
      $("#avatar").attr("src", "imagenes/usuario.png");
    }
  });

  // TODO: Evento boton inicio sesion
  $("#btnInicioSesion").click(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          $("#avatar").attr("src", "imagenes/usuario.png");
          Materialize.toast("SignOut correcto", 4000);
        })
        .catch(err => {
          Materialize.toast(err, 4000);
        });
    }

    $("#emailSesion").val("");
    $("#passwordSesion").val("");
    $("#modalSesion").modal("open");
  });

  $("#avatar").click(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        $("#avatar").attr("src", "imagenes/usuario.png");
        Materialize.toast(`SignOut correcto`, 4000);
      })
      .catch(err => {
        Materialize.toast(`Error al realizar SignOut ${err}`, 4000);
      });
  });

  $("#btnTodoPost").click(() => {
    $("#tituloPost").text("Posts de la Comunidad");
    post.consultarTodosPost();
  });

  $("#btnMisPost").click(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      post.consultarPostxUsuario(user.email);
      $("#tituloPost").text("Mis Posts");
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000);
    }
  });
});
