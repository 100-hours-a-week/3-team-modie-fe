import { useState } from "react";
import { meetType } from "../types/meetType";

type ConfirmType = "delete" | "end" | "hide" | "exit" | null;

/**
 * 옵션 클릭에 대한 모달 내부 텍스트를 조정합니다.
 * @author 희진
 */

export const useHeaderConfirmModal = (meetStatus?: meetType["data"]) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState<ConfirmType>(null);

  const openConfirmModal = (type: ConfirmType) => {
    setConfirmType(type);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = () => {
    switch (confirmType) {
      case "delete":
        console.log("모임 삭제 API 실행");
        break;
      case "end":
        console.log("모임 종료 API 실행");
        break;
      case "hide":
        console.log("모임 숨기기 API 실행");
        break;
      case "exit":
        console.log("모임 나가기 API 실행");
        break;
    }
    closeConfirmModal();
  };

  const getConfirmModalContent = () => {
    const name = `‘${meetStatus?.meetIntro}’`;
    const contentMap = {
      delete: {
        title: `${name} 삭제하기`,
        description: (
          <>
            {name}을 삭제하면 다시 불러올 수 없습니다.
            <br />
            삭제하시겠습니까?
          </>
        ),
        confirmText: "삭제하기",
      },
      end: {
        title: `${name} 종료하기`,
        description: (
          <>
            {name}을 종료하면 다시 시작할 수 없습니다.
            <br />
            종료하시겠습니까?
          </>
        ),
        confirmText: "종료하기",
      },
      hide: {
        title: `${name} 숨기기`,
        description: (
          <>
            {name}을 숨기면 리스트에서 보이지 않습니다.
            <br />
            숨기시겠습니까?
          </>
        ),
        confirmText: "숨기기",
      },
      exit: {
        title: `${name} 나가기`,
        description: (
          <>
            {name}을 나가면 다시 들어올 수 없습니다.
            <br />
            나가시겠습니까?
          </>
        ),
        confirmText: "나가기",
      },
    };

    return contentMap[confirmType || "delete"];
  };

  return {
    showConfirmModal,
    confirmType,
    openConfirmModal,
    closeConfirmModal,
    handleConfirm,
    getConfirmModalContent,
  };
};
