import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 타입 정의
export interface ConfirmContentType {
  title: string;
  description: string;
  confirmText: string;
}

export const useMyPage = () => {
  const navigate = useNavigate();

  // 계좌 관련 상태
  const [isEditing, setIsEditing] = useState(false);
  const [bankName, setBankName] = useState("국민은행");
  const [accountNumber, setAccountNumber] = useState("1234567890");

  // 참조
  const bankInputRef = useRef<HTMLInputElement>(null);
  const accountInputRef = useRef<HTMLInputElement>(null);

  // 모달 관련 상태
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmContent, setConfirmContent] =
    useState<ConfirmContentType | null>(null);

  // 수정 모드 포커스 효과
  useEffect(() => {
    if (isEditing && accountInputRef.current) {
      accountInputRef.current.focus();
    }
  }, [isEditing]);

  // 계좌 수정 토글
  const handleEditToggle = () => {
    if (isEditing) {
      // Save logic would go here
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
    navigate("/login");
    closeConfirmModal();
  };

  // 약관 페이지로 이동
  const goToTerms = () => navigate("/term");

  return {
    // 상태
    isEditing,
    bankName,
    accountNumber,
    showConfirmModal,
    confirmContent,

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
  };
};
