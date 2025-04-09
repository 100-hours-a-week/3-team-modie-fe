import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { meetType } from "../types/meetType";
import { MODAL_TYPES, ModalType } from "../types/modalType";
import { getModalText } from "../../utils/getModalText";
import { deleteMeetService } from "../../meetDetail/services/deleteMeetService";
import { completeMeetService } from "../../meetDetail/services/completeMeetService";
import { exitMeetService } from "../../meetDetail/services/exitMeetService";
import { handleError } from "../../__sentry__/useErrorHandler";

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
          handleError(e, {
            type: "meet-manage",
            page: "meet-detail",
            message: "모임 삭제 실패",
            extra: { meetId: meetId, userToken: token },
          });
        }
        break;
      case MODAL_TYPES.END:
        try {
          await completeMeetService(meetId, token);
          navigate("/end");
        } catch (e) {
          handleError(e, {
            type: "meet-manage",
            page: "meet-detail",
            message: "모임 종료 실패",
            extra: { meetId: meetId, userToken: token },
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
          handleError(e, {
            type: "meet-manage",
            page: "meet-detail",
            message: "모임 나가기 실패",
            extra: { meetId: meetId, userToken: token },
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
