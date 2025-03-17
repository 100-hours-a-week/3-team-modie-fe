import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface Coordinates {
  lat: number;
  lng: number;
}

interface KakaoMapProps {
  address: string;
}

const KakaoMap = ({ address }: KakaoMapProps) => {
  const [coords, setCoords] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!window.kakao?.maps?.services) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        console.error("주소로 좌표를 찾을 수 없습니다.");
      }
    });
  }, [address]);

  if (!coords) return <div>지도를 불러오는 중입니다...</div>;

  return (
    <Map center={coords} level={3} className="w-full h-[84px] rounded-xl">
      <MapMarker position={coords} />
    </Map>
  );
};

export default KakaoMap;
