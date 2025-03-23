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

export default function CreateMeetPlace() {
  const {
    center,
    position,
    handleMapClick,
    description,
    setDescription,
    isFormValid,
    handleSubmit,
    toastMessage,
    isToastVisible,
  } = useCreateMeetPlace();

  const { meetInfo, setMeetInfo } = useCreateMeetStore();

  useEffect(() => {
    if (meetInfo.addressDetail) {
      setDescription(meetInfo.addressDetail);
    }
  }, [setDescription, meetInfo.addressDetail]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header title="출발 장소 선택" />
      <ProgressBar width={50} />

      {!center ? (
        <div className="flex items-center justify-center h-[552px] bg-white/60">
          <div className="text-gray9e text-Body1">지도를 불러오는 중...</div>
        </div>
      ) : (
        <Map
          center={center}
          style={{ width: "100%", height: "552px" }}
          level={3}
          onClick={(_, mouseEvent) => {
            const latlng = mouseEvent.latLng;
            handleMapClick(latlng.getLat(), latlng.getLng());
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

      <div className="mb-15 px-5 mt-5">
        <input
          type="text"
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= 20) {
              setDescription(e.target.value);
              setMeetInfo({
                addressDetail: e.target.value,
              });
            }
          }}
          placeholder="장소에 대한 간단한 설명을 적어주세요."
          style={{ backgroundColor: "#f5f5f5" }}
          className="w-full rounded-md p-4 text-Body2 placeholder:text-grayBd focus:outline-none"
        />
      </div>

      <div className="fixed bottom-29 w-full flex justify-center">
        <ToastMsg active={isToastVisible} description={toastMessage} />
      </div>

      <div
        className="fixed bottom-0 w-full px-7 flex justify-center pb-6"
        onClick={handleSubmit}
      >
        <SubmitBtn active={isFormValid} description="다음" />
      </div>
    </div>
  );
}
