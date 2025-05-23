import { Map, MapMarker } from "react-kakao-maps-sdk";
import Header from "../../common/components/Header";
import ProgressBar from "../../common/components/ProgressBar";
import SubmitBtn from "../../common/components/SubmitBtn";
import ToastMsg from "../../common/components/ToastMsg";
import MarkerInfoWindow from "../components/MarkerInfoWindow";
import markerIcon from "../../assets/marker.svg";
import { useCreateMeetPlace } from "../hooks/useCreateMeetPlace";
import { useCreateMeetStore } from "../store/useCreateMeetStore";
import { useEffect } from "react";
import { useGeocode } from "../../common/hooks/useGeocodes";
import LoadingMap from "../components/LoadingMap";

export default function CreateMeetPlace() {
  const {
    center,
    setCenter,
    position,
    setPosition,
    handleMapClick,
    description,
    setDescription,
    isFormValid,
    handleSubmit,
    toastMessage,
    isToastVisible,
    hasPermission,
  } = useCreateMeetPlace();

  const { meetInfo, setMeetInfo, isEditMode, editMeetInfo } =
    useCreateMeetStore();

  const { getCoordsByAddress } = useGeocode();

  useEffect(() => {
    if (isEditMode && editMeetInfo?.address) {
      setDescription(editMeetInfo.addressDescription || "");

      getCoordsByAddress(editMeetInfo.address).then((coords) => {
        if (!coords) return;

        const { lat, lng } = coords;
        setCenter({ lat, lng });
        setPosition({ lat, lng });

        setMeetInfo({
          ...meetInfo,
          lat,
          lng,
          address: editMeetInfo.address,
          addressDescription: editMeetInfo.addressDescription,
        });
      });
    }
  }, [isEditMode, editMeetInfo]);

  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <Header title="출발 장소 선택" />
      <ProgressBar width={50} />

      {!center || hasPermission === null ? ( // null = 로딩 중
        <LoadingMap />
      ) : hasPermission === false ? ( // false = 거부
        <div className="flex items-center justify-center h-[552px] bg-white/60">
          <div className="text-gray9e text-Body1">
            위치 권한이 없으면 지도를 사용할 수 없어요.
          </div>
        </div>
      ) : (
        <Map
          center={center}
          style={{ width: "100%", height: "70vh" }}
          level={3}
          minLevel={10}
          onClick={(_, mouseEvent) => {
            const latlng = mouseEvent.latLng;
            const lat = latlng.getLat();
            const lng = latlng.getLng();
            handleMapClick(lat, lng);

            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(lng, lat, (result, status) => {
              if (
                status === window.kakao.maps.services.Status.OK &&
                result.length > 0
              ) {
                const address = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name;

                setMeetInfo({
                  address,
                  lat,
                  lng,
                });
              }
            });
          }}
        >
          {position && (
            <>
              <MapMarker
                position={position}
                image={{ src: markerIcon, size: { width: 24, height: 24 } }}
              />
              <MarkerInfoWindow lat={position.lat} lng={position.lng} />
            </>
          )}
        </Map>
      )}

      <div className="min-h-[166px]">
        <div className="mb-15 px-5 mt-5 min-h-[41px]">
          <input
            type="text"
            value={description}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 20) {
                setDescription(value);
              }
            }}
            placeholder="장소에 대한 간단한 설명을 적어주세요."
            style={{ backgroundColor: "#f5f5f5" }}
            className="w-full rounded-md p-4 text-Body2 placeholder:text-grayBd focus:outline-none"
          />
        </div>

        <div className="absolute bottom-29 w-full flex justify-center z-[2000]">
          <ToastMsg active={isToastVisible} description={toastMessage} />
        </div>

        <div
          className="absolute bottom-0 w-full flex justify-center pb-6"
          onClick={handleSubmit}
        >
          <SubmitBtn active={isFormValid} description="다음" />
        </div>
      </div>
    </div>
  );
}
