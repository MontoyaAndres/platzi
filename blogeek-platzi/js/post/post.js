class Post {
  constructor() {
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  crearPost(uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    return this.db
      .collection("posts")
      .add({
        uid,
        emailUser,
        titulo,
        descripcion,
        imagenLink,
        videoLink,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(refDoc => {
        console.log("El id del post es:", refDoc.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  consultarTodosPost() {
    this.db
      .collection("posts")
      .orderBy("fecha", "asc")
      .orderBy("titulo", "asc")
      .onSnapshot(querySnapshot => {
        $("#posts").empty();

        if (querySnapshot.empty) {
          $("#posts").append(this.obtenerTemplatePostVacio());
        } else {
          querySnapshot.forEach(post => {
            let postHTML = this.obtenerPostTemplate(
              post.data().emailUser,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha.toDate())
            );

            $("#posts").append(postHTML);
          });
        }
      });
  }

  consultarPostxUsuario(emailUser) {
    this.db
      .collection("posts")
      .orderBy("fecha", "asc")
      .where("emailUser", "==", emailUser)
      .onSnapshot(querySnapshot => {
        $("#posts").empty();

        if (querySnapshot.empty) {
          $("#posts").append(this.obtenerTemplatePostVacio());
        } else {
          querySnapshot.forEach(post => {
            let postHTML = this.obtenerPostTemplate(
              post.data().emailUser,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink,
              Utilidad.obtenerFecha(post.data().fecha)
            );

            $("#posts").append(postHTML);
          });
        }
      });
  }

  subirImagenPost(file, uid) {
    const refStorage = this.storage.ref(`imgsPosts/${uid}/${file.name}`);
    const task = refStorage.put(file);

    task.on(
      "state_changed",
      function(snapshot) {
        const porcentaje =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        $(".determinate").attr("style", `width: ${porcentaje}`);
      },
      function(err) {
        Materialize.toast("Error subiendo archivo", 4000);
        console.log(err);
      },
      function() {
        task.snapshot.ref
          .getDownloadURL()
          .then(url => {
            console.log(url);
            sessionStorage.setItem("imgNewPost", url);
          })
          .catch(err => {
            Materialize.toast("Error obteniendo error", 4000);
            console.log(err);
          });
      }
    );
  }

  obtenerTemplatePostVacio() {
    return `<article class="post">
      <div class="post-titulo">
        <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`;
  }

  obtenerPostTemplate(
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    console.log(imagenLink);
    if (imagenLink) {
      return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`;
    }

    return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`;
  }
}
