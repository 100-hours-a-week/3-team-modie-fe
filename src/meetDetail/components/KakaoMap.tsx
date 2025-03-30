import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useToast } from "../../common/hooks/useToastMsg";
import ToastMsg from "../../common/components/ToastMsg";

interface Coordinates {
  lat: number;
  lng: number;
}

interface KakaoMapProps {
  address: string;
}

const KakaoMap = ({ address }: KakaoMapProps) => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const { toastMessage, isToastVisible, showToast } = useToast();

  useEffect(() => {
    if (!address || address.trim() === "") return;

    if (!address) {
      showToast("설정된 주소가 없습니다.");
      return;
    }

    if (!window.kakao?.maps?.services) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        showToast("주소로 좌표를 찾을 수 없습니다.");
      }
    });
  }, [address]);

  return (
    <>
      {coords ? (
        <Map
          center={coords}
          level={3}
          className="w-full aspect-[350/84] rounded-xl"
        >
          <MapMarker position={coords} />
        </Map>
      ) : (
        <></>
      )}

      <div className="fixed bottom-24 w-full flex justify-center z-50">
        <ToastMsg active={isToastVisible} description={toastMessage} />
      </div>
    </>
  );
};

export default KakaoMap;
