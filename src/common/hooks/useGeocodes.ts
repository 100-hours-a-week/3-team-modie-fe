import { useState } from "react";
import * as Sentry from "@sentry/react";

export const useGeocode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCoordsByAddress = (
    address: string
  ): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!window.kakao?.maps?.services) {
        setError("카카오 지도 서비스를 사용할 수 없습니다.");
        resolve(null);
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      setLoading(true);
      setError("");

      geocoder.addressSearch(address, (result, status) => {
        setLoading(false);
        try {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            const { y, x } = result[0];
            resolve({ lat: parseFloat(y), lng: parseFloat(x) });
          }
        } catch (e) {
          Sentry.captureException(e, {
            tags: { feature: "geocode" },
          });
          setError("주소로 좌표를 찾을 수 없습니다.");
          resolve(null);
        }
      });
    });
  };

  const getAddressByCoords = (
    lat: number,
    lng: number
  ): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!window.kakao?.maps?.services) {
        setError("카카오 지도 서비스를 사용할 수 없습니다.");
        resolve(null);
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      setLoading(true);
      setError("");

      geocoder.coord2Address(lng, lat, (result, status) => {
        setLoading(false);
        try {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            const address =
              result[0].road_address?.address_name ||
              result[0].address?.address_name;
            resolve(address || null);
          }
        } catch (e) {
          Sentry.captureException(e, {
            tags: { feature: "geocode" },
          });
          setError("좌표로 주소를 찾을 수 없습니다.");
          resolve(null);
        }
      });
    });
  };

  return { getCoordsByAddress, getAddressByCoords, loading, error };
};
