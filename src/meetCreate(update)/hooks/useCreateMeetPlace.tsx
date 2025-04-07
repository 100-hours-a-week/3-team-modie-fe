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
  const [position, setPosition] = useState<position | undefined>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null); // null = 로딩 중, true = 허용, false = 거부
  const { toastMessage, isToastVisible, showToast } = useToast();

  const { meetInfo, setMeetInfo } = useCreateMeetStore();

  // 설명 상태를 스토어에서 가져오도록 수정
  const [description, setDescription] = useState(
    meetInfo.addressDescription || ""
  );

  // 폼 유효성 검사
  const isFormValid = !!position && description.trim().length > 0;

  // 페이지 로드 시 스토어에서 위치 정보 가져오기
  useEffect(() => {
    // 이미 저장된 위치 정보가 있으면 사용
    if (meetInfo.lat && meetInfo.lng) {
      const savedPos = { lat: meetInfo.lat, lng: meetInfo.lng };
      setCenter(savedPos);
      setPosition(savedPos);

      // 설명도 스토어에서 가져오기
      if (meetInfo.addressDescription) {
        setDescription(meetInfo.addressDescription);
      }
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
  }, [meetInfo.lat, meetInfo.lng, meetInfo.addressDescription]);

  // 설명이 변경될 때마다 스토어에 저장
  useEffect(() => {
    if (description) {
      setMeetInfo({
        addressDescription: description,
      });
    }
  }, [description, setMeetInfo]);

  // 위치가 변경될 때마다 스토어에 저장
  useEffect(() => {
    if (position) {
      setMeetInfo({
        lat: position.lat,
        lng: position.lng,
      });
    }
  }, [position, setMeetInfo]);

  useEffect(() => {
    const askForLocation = async () => {
      if (!("geolocation" in navigator)) {
        setHasPermission(false);
        showToast("이 브라우저는 위치 정보를 지원하지 않아요.");
        return;
      }

      const updatePosition = (lat: number, lng: number) => {
        const userPos = { lat, lng };
        setCenter(userPos);
        setPosition(userPos);
        setHasPermission(true);
      };

      const onSuccess = (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;
        updatePosition(latitude, longitude);
      };

      const onError = () => {
        setHasPermission(false);
        showToast("위치 정보 접근에 실패했어요.");
      };

      try {
        const { state } = await navigator.permissions.query({
          name: "geolocation",
        });

        if (state === "denied") {
          setHasPermission(false);
          showToast("위치 접근 권한이 필요해요.");
          return;
        }

        if (meetInfo.lat && meetInfo.lng) {
          updatePosition(meetInfo.lat, meetInfo.lng);
        } else {
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
      } catch {
        setHasPermission(false);
        showToast("위치 권한 확인 중 문제가 발생했어요.");
      }
    };

    askForLocation();
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

    navigate("/meet/create/other");
  };

  return {
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
  };
};
