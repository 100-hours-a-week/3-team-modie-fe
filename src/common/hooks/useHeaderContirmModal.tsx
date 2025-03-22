import { useState } from "react";
import { meetType } from "../types/meetType";
import { MODAL_TYPES, ModalType } from "../types/modalType";
import { getModalText } from "../../utils/getModalText";

/**
 * 옵션 클릭에 대한 모달 내부 텍스트를 조정합니다.
 * @author 희진
 */

export const useHeaderConfirmModal = (meetStatus?: meetType) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState<ModalType | null>(null);

  const openConfirmModal = (type: ModalType) => {
    setConfirmType(type);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = () => {
    switch (confirmType) {
      case MODAL_TYPES.DELETE:
        console.log("모임 삭제 API 실행");
        break;
      case MODAL_TYPES.END:
        console.log("모임 종료 API 실행");
        break;
      case MODAL_TYPES.HIDE:
        console.log("모임 숨기기 API 실행");
        break;
      case MODAL_TYPES.EXIT:
        console.log("모임 나가기 API 실행");
        break;
    }
    closeConfirmModal();
  };

  const getConfirmModalContent = () => {
    const name = `‘${meetStatus?.meetIntro}’`;
    const content = getModalText(confirmType || MODAL_TYPES.DELETE, name);

    return {
      title: content.title,
      description: (
        <>
          {content.description}
          <br />
          {content.confirmText.replace("하기", "")}하시겠습니까?
        </>
      ),
      confirmText: content.confirmText,
    };
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
