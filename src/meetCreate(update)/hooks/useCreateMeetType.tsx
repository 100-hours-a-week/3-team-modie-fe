import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMeetCreateValidation } from "./useMeetCreateValidation";
import { useToast } from "../../common/hooks/useToastMsg";
import { useCreateMeetStore } from "../store/useCreateMeetStore";

/**
 * 모임 생성 페이지 1단계 커스텀 훅
 * 모임 소개글, 유형, 유형(기타) 입력값을 관리합니다.
 * @author 희진
 */

export const useCreateMeetType = () => {
  const { meetInfo, setMeetInfo } = useCreateMeetStore();
  const navigate = useNavigate();
  const [intro, setIntro] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customType, setCustomType] = useState("");

  useEffect(() => {
    if (meetInfo) {
      setIntro(meetInfo.intro || "");
      setSelectedCategory(meetInfo.category || "");
      setCustomType(meetInfo.customType || "");
    }
  }, [meetInfo]);

  const { toastMessage, isToastVisible, showToast } = useToast();

  const { isValid } = useMeetCreateValidation({
    intro,
    category: selectedCategory,
    customType,
  });

  const handleCategoryClick = (label: string) => {
    setSelectedCategory(label);
    if (label !== "기타") setCustomType("");
  };

  const errorMessages: Record<string, string> = {
    intro: "모임 소개글을 작성해주세요",
    category: "유형을 선택해주세요",
    customType: "모임 유형을 작성해주세요",
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const validationChecks: [boolean, keyof typeof errorMessages][] = [
      [!intro.trim(), "intro"],
      [!selectedCategory, "category"],
      [selectedCategory === "기타" && !customType.trim(), "customType"],
    ];

    const invalid = validationChecks.find(([condition]) => condition);
    if (invalid) {
      const [, key] = invalid;
      showToast(errorMessages[key]);
      return;
    }

    // 저장 시 zustand store에 저장
    setMeetInfo({
      intro,
      category: selectedCategory,
      customType: selectedCategory === "기타" ? customType : "",
      meetAt: "",
    });

    navigate("/meet/create/place");
  };

  return {
    intro,
    setIntro,
    selectedCategory,
    handleCategoryClick,
    customType,
    setCustomType,
    isValid,
    handleSubmit,
    toastMessage,
    isToastVisible,
  };
};
