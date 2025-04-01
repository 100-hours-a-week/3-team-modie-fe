self.addEventListener("install", (e) => {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: "./favicon.svg",
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
