import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { meetType } from "../types/meetType";
import { MODAL_TYPES, ModalType } from "../types/modalType";
import { getModalText } from "../../utils/getModalText";
import { deleteMeetService } from "../../meetDetail/services/deleteMeetService";
import { completeMeetService } from "../../meetDetail/services/completeMeetService";
import { exitMeetService } from "../../meetDetail/services/exitMeetService";
import * as Sentry from "@sentry/react";

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
        try {
          await deleteMeetService(meetId, token);
          navigate("/");
        } catch (e) {
          Sentry.captureException(e, {
            tags: { feature: "meet-detail", meetId },
          });
        }
        break;
      case MODAL_TYPES.END:
        try {
          await completeMeetService(meetId, token);
          navigate("/end");
        } catch (e) {
          Sentry.captureException(e, {
            tags: { feature: "meet-detail", meetId },
          });
        }
        break;
      case MODAL_TYPES.HIDE:
        break;
      case MODAL_TYPES.EXIT:
        try {
          await exitMeetService(meetId, token);
          navigate("/");
        } catch (e) {
          Sentry.captureException(e, {
            tags: { feature: "meet-detail", meetId },
          });
        }
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
