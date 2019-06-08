importScripts("https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.1.0/firebase-messaging.js");

// Init Firebase nuevamente
firebase.initializeApp({
  projectId: "blogeekplatzi-84b06",
  messagingSenderId: "440104202183"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const notificationTitle = "¡Nuevo post!";
  const notificationOptions = {
    body: payload.data.titulo,
    icon: "icons/icon_new_post.png",
    click_action: "https://blogeekplatzi-84b06.firebaseapp.com/"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
