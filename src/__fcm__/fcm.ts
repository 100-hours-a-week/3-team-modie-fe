import { app } from "../../firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { postFcmService } from "../login/services/postFcmService";
import * as Sentry from "@sentry/react";

// 브라우저 알림 권한 요청 + 토큰 발급
export const initFCM = async () => {
  const messaging = getMessaging(app);
  const loginToken = localStorage.getItem("accessToken");

  const requestPermissionAndGetToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const fcmToken = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        if (fcmToken && loginToken) {
          const requestData = {
            token: fcmToken,
            deviceType: "web",
          };
          await postFcmService(requestData, loginToken);
        }
      }
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/firebase-messaging-sw.js");
      await requestPermissionAndGetToken();
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  onMessage(messaging, (payload) => {
    try {
      const { title, body } = payload.notification || {};
      const url = payload.data?.url;

      const notification = new Notification(title || "알림", {
        badge: "/logo.png",
        body: body || "새로운 메시지가 도착했어요.",
        icon: "/logo.png",
        data: url ? { url } : {},
      });

      notification.onclick = (event) => {
        event.preventDefault();
        if (notification.data?.url) {
          window.open(notification.data.url, "_blank");
        }
      };
    } catch (e) {
      Sentry.captureException(e);
    }
  });
};
