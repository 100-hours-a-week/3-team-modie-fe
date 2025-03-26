import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../common/hooks/useToastMsg";
import { getUserService } from "../services/getUserService";
import { updateAccountNumberService } from "../services/updateAccountNumber";

// 타입 정의
export interface ConfirmContentType {
  title: string;
  description: string;
  confirmText: string;
}

export const useMyPage = () => {
  const navigate = useNavigate();
  const { showToast, isToastVisible, toastMessage } = useToast();

  // 계좌 관련 상태
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 참조
  const bankInputRef = useRef<HTMLInputElement>(null);
  const accountInputRef = useRef<HTMLInputElement>(null);

  // 모달 관련 상태
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmContent, setConfirmContent] =
    useState<ConfirmContentType | null>(null);

  // 유저 정보 조회
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          showToast("로그인이 필요합니다.");
          return;
        }

        const res = await getUserService(token);

        setUserName(res.data.userName);
        setBankName(res.data.bankName);
        setAccountNumber(res.data.accountNumber);
        setProfileImg(res.data.profileImageUrl);
      } catch {
        showToast("유저 조회 중 오류가 발생했어요.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 수정 모드 포커스 효과
  useEffect(() => {
    if (isEditing && accountInputRef.current) {
      accountInputRef.current.focus();
    }
  }, [isEditing]);

  // 계좌 수정 토글
  const handleEditToggle = async () => {
    if (isEditing) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        showToast("로그인이 필요합니다.");
        return;
      }

      const requestData = {
        bankName: bankName,
        accountNumber: accountNumber,
      };

      try {
        const res = await updateAccountNumberService(requestData, token);

        if (res.success == true) {
          showToast("계좌 정보가 수정되었어요.");
        } else {
          const errorMessage = res.message || "계좌 수정에 실패했어요.";
          showToast(errorMessage);
        }
      } catch {
        showToast("계좌 정보 수정 중 오류가 발생했어요.");
      }
    }

    setIsEditing(!isEditing);
  };

  // 로그아웃 모달 열기
  const openLogoutModal = () => {
    setConfirmContent({
      title: "로그아웃",
      description: "정말 로그아웃 하시겠습니까?",
      confirmText: "로그아웃",
    });
    setShowConfirmModal(true);
  };

  // 모달 닫기
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmContent(null);
  };

  // 로그아웃 확인 처리
  const handleConfirm = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    closeConfirmModal();
  };

  // 약관 페이지로 이동
  const goToTerms = () => navigate("/term");

  return {
    // 상태
    isEditing,
    userName,
    bankName,
    accountNumber,
    profileImg,
    showConfirmModal,
    confirmContent,
    isLoading,

    // 참조
    bankInputRef,
    accountInputRef,

    // 핸들러
    handleEditToggle,
    setBankName,
    setAccountNumber,
    openLogoutModal,
    closeConfirmModal,
    handleConfirm,
    goToTerms,

    // 토스트 메세지
    isToastVisible,
    toastMessage,
  };
};
