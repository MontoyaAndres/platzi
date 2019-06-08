$(() => {
  $("#btnModalPost").click(() => {
    $("#tituloNewPost").val("");
    $("#descripcionNewPost").val("");
    $("#linkVideoNewPost").val("");
    $("#btnUploadFile").val("");
    $(".determinate").attr("style", `width: 0%`);
    sessionStorage.setItem("imgNewPost", null);

    $("#modalPost").modal("open");
  });

  const post = new Post();

  $("#btnRegistroPost").click(() => {
    const user = firebase.auth().currentUser;

    if (!user) {
      Materialize.toast(`Para crear el post debes estar autenticado`, 4000);

      return;
    }

    const titulo = $("#tituloNewPost").val();
    const descripcion = $("#descripcionNewPost").val();
    const videoLink = $("#linkVideoNewPost").val();
    const imagenLink =
      sessionStorage.getItem("imgNewPost") == "null"
        ? null
        : sessionStorage.getItem("imgNewPost");

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
      )
      .then(resp => {
        Materialize.toast(`Post creado correctamente`, 4000);
        $(".modal").modal("close");
      })
      .catch(err => {
        Materialize.toast(`Error => ${err}`, 4000);
      });
  });

  $("#btnUploadFile").on("change", e => {
    const user = firebase.auth().currentUser;
    const file = e.target.files[0];

    if (!user) {
      Materialize.toast(`Para crear el post debes estar autenticado`, 4000);

      return;
    }

    post.subirImagenPost(file, user.uid);
  });
});
