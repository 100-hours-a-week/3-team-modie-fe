importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {});

const firebaseConfig = {
  apiKey: "AIzaSyAs8oK-sYO8vRQgzZCheGfkddXeqkTAxtM",
  authDomain: "modie-8ae56.firebaseapp.com",
  projectId: "modie-8ae56",
  storageBucket: "modie-8ae56.firebasestorage.app",
  messagingSenderId: "304684492142",
  appId: "1:304684492142:web:5a0f47d06ad5710054cd7f",
  measurementId: "G-PE5X5HBR6J",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신:", payload);

  const { title, body } = payload.notification || {};

  self.registration.showNotification(title || "알림", {
    body: body || "새로운 메시지가 도착했어요.",
    icon: "/icons/favicon.svg",
  });
});
