import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../../common/hooks/useToastMsg";
import { useCreateMeetStore } from "../store/useCreateMeetStore";

interface position {
  lat: number;
  lng: number;
}
/**
 * 모임 생성 페이지 2단계 커스텀 훅
 * 모임 장소, 장소 설명을 관리합니다.
 * @author 희진
 */

export const useCreateMeetPlace = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState<position | null>(null);
  const [position, setPosition] = useState<position>();
  const [description, setDescription] = useState("");

  const isFormValid = !!position && description.trim().length > 0;

  const { toastMessage, isToastVisible, showToast } = useToast();
  const { meetInfo, setMeetInfo } = useCreateMeetStore();

  useEffect(() => {
    if (meetInfo.lat && meetInfo.lng) {
      const savedPos = { lat: meetInfo.lat, lng: meetInfo.lng };
      setCenter(savedPos);
      setPosition(savedPos);
    } else {
      // 처음 진입 시 현재 위치 불러오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userPos = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setCenter(userPos);
            setPosition(userPos);
          },
          () => {
            const fallback = { lat: 33.450701, lng: 126.570667 };
            setCenter(fallback);
            setPosition(fallback);
          }
        );
      }
    }
  }, [meetInfo.lat, meetInfo.lng]);

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

    if (description) {
      setMeetInfo({
        lat: position.lat,
        lng: position.lng,
        addressDetail: description,
      });
    }

    navigate("/meet/create/other");
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
