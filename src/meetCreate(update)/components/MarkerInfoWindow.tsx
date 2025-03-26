import { useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { useCreateMeetStore } from "../store/useCreateMeetStore";
import { useGeocode } from "../../common/hooks/useGeocodes";

interface MarkerInfoWindowProps {
  lat: number | undefined;
  lng: number | undefined;
}

/**
 * 마커에 대한 커스텀 윈포위도우
 * @author 희진
 */

export default function MarkerInfoWindow({ lat, lng }: MarkerInfoWindowProps) {
  const [address, setAddress] = useState("");
  const { meetInfo, setMeetInfo } = useCreateMeetStore();
  const { getAddressByCoords } = useGeocode();

  useEffect(() => {
    if (meetInfo.address) {
      setAddress(meetInfo.address);
      return;
    }

    if (!lat || !lng) return;

    getAddressByCoords(lat, lng).then((addr) => {
      if (addr) {
        setAddress(addr);
        setMeetInfo({ address: addr });
      } else {
        setAddress("주소 정보를 찾을 수 없습니다");
      }
    });
  }, [lat, lng]);

  return (
    <>
      {lat && lng && (
        <CustomOverlayMap position={{ lat, lng }}>
          <div
            className="absolute z-10 bg-primaryDark2 text-white text-Caption1 p-3 rounded-md"
            style={{
              transform: "translate(-50%, -200%)",
              wordBreak: "break-word",
              maxWidth: "220px",
              textAlign: "center",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="text-Caption1 text-white">{address}</div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
