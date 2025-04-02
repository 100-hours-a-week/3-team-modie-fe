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

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url;

  if (!targetUrl) return;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

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
  const url = payload.data?.url;

  const options = {
    badge: "/logo.png",
    image: "/logo.png",
    body: body || "새로운 메시지가 도착했어요.",
    icon: "/logo.png",
    data: url ? { url } : {},
  };

  self.registration.showNotification(title || "알림", options);
});

// 웹소켓
self.addEventListener("install", (e) => {
  console.log("[Service Worker] installed");
});

// activate event
self.addEventListener("activate", (e) => {
  console.log("[Service Worker] actived", e);
});

// fetch event
self.addEventListener("fetch", (e) => {
  console.log("[Service Worker] fetched resource " + e.request.url);
});
