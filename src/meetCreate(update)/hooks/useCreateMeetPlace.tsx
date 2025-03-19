import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../../common/hooks/useToastMsg";

/**
 * 모임 생성 페이지 2단계 커스텀 훅
 * 모임 장소, 장소 설명을 관리합니다.
 * @author 희진
 */

export const useCreateMeetPlace = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [position, setPosition] = useState<{ lat: number; lng: number }>();
  const [description, setDescription] = useState("");

  const isFormValid = !!position && description.trim().length > 0;

  const { toastMessage, isToastVisible, showToast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setCenter(userPos);
          setPosition(userPos); // 사용자 현재 위치 마커 찍기
        },
        () => {
          const fallback = { lat: 33.450701, lng: 126.570667 };
          setCenter(fallback);
          setPosition(fallback);
        }
      );
    }
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setPosition({ lat, lng });
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      if (!description.trim()) {
        showToast("장소에 대한 설명을 입력해주세요.");
      }
      return;
    }

    navigate("/createMeetOther");
  };

  return {
    center,
    position,
    handleMapClick,
    description,
    setDescription,
    isFormValid,
    handleSubmit,
    toastMessage,
    isToastVisible,
  };
};
