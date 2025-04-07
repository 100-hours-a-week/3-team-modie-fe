import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { meetType } from "../types/meetType";
import { MODAL_TYPES, ModalType } from "../types/modalType";
import { getModalText } from "../../utils/getModalText";
import { deleteMeetService } from "../../meetDetail/services/deleteMeetService";
import { completeMeetService } from "../../meetDetail/services/completeMeetService";
import { exitMeetService } from "../../meetDetail/services/exitMeetService";

/**
 * 옵션 클릭에 대한 모달 내부 텍스트를 조정합니다.
 * @author 희진
 */

export const useHeaderConfirmModal = (meetStatus?: meetType) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState<ModalType | null>(null);

  const openConfirmModal = (type: ModalType) => {
    setConfirmType(type);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = async () => {
    const meetId = meetStatus?.meetId;
    const token = localStorage.getItem("accessToken");

    if (!meetId || !token) {
      alert("모임 정보 또는 토큰이 없습니다.");
      return;
    }

    switch (confirmType) {
      case MODAL_TYPES.DELETE:
        await deleteMeetService(meetId, token);
        navigate("/");
        break;
      case MODAL_TYPES.END:
        await completeMeetService(meetId, token);
        navigate("/end");
        break;
      case MODAL_TYPES.HIDE:
        break;
      case MODAL_TYPES.EXIT:
        await exitMeetService(meetId, token);
        navigate("/");
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
          <br />
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
