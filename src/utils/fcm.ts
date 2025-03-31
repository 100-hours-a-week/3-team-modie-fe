import { app } from "../../firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 브라우저 알림 권한 요청 + 토큰 발급
// fcm.ts
export const initFCM = () => {
  const messaging = getMessaging(app);

  const requestPermissionAndGetToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const fcmToken = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
        if (fcmToken) console.log("📲 FCM 토큰:", fcmToken);
        else console.log("❌ FCM 토큰을 가져올 수 없습니다.");
      } else {
        console.log("🔕 알림 권한이 거부되었습니다.");
      }
    } catch (error) {
      console.error("⚠️ FCM 토큰 요청 실패:", error);
    }
  };

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("✅ Service Worker 등록됨", registration);
        await requestPermissionAndGetToken();
      } catch (error) {
        console.error("❌ Service Worker 등록 실패:", error);
      }
    });
  }

  onMessage(messaging, (payload) => {
    console.log("💬 Foreground 메시지 수신됨:", payload);
    // TODO: toast 메시지 표시 등 UI 작업
  });
};
