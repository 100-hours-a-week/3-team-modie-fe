import { useState, useEffect, useRef } from "react";
import arrowIcon from "../../assets/arrow.svg";
import logoIcon from "../../assets/logo.svg";
import settingIcon from "../../assets/setting.svg";
import { headerType } from "../types/headerType";
import { useMeetStatus } from "../store/useMeetStatus";
import HeaderDropbox from "../../meetDetail/components/HeaderDropbox";
import ConfirmModal from "./ConfirmModal";
import dayjs from "dayjs";

export default function Header({ title, meetStatus, isMainPage }: headerType) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState<
    "delete" | "end" | "hide" | "exit" | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const statusIcon = useMeetStatus(meetStatus);

  // ✅ ConfirmModal 텍스트 분리
  // ✅ getConfirmModalContent 함수 수정
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

  // ✅ 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  // ✅ confirm 동작
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
    setShowConfirmModal(false);
  };

  // ✅ 아이콘 클릭 시 동작
  const handleStatusIconClick = () => {
    if (!meetStatus) return;

    const isOwner = meetStatus.meetRule === "owner";
    const isBeforeMeet = dayjs().isBefore(dayjs(meetStatus.meetDt));

    if (!isOwner && isBeforeMeet) {
      setConfirmType("exit");
      setShowConfirmModal(true);
      return;
    }
    setShowDropdown((prev) => !prev);
  };

  // ✅ 드롭다운 클릭 핸들러
  const handleDeleteClick = () => {
    setConfirmType("delete");
    setShowConfirmModal(true);
    setShowDropdown(false);
  };

  const handleEndClick = () => {
    setConfirmType("end");
    setShowConfirmModal(true);
    setShowDropdown(false);
  };

  const handleHideClick = () => {
    setConfirmType("hide");
    setShowConfirmModal(true);
    setShowDropdown(false);
  };

  const handleUpdateClick = () => {
    console.log("수정 페이지로 이동");
    setShowDropdown(false);
  };

  const handlePayClick = () => {
    console.log("정산 페이지로 이동 또는 API 호출");
    setShowDropdown(false);
  };

  const confirmContent = getConfirmModalContent();

  return (
    <>
      <header className="relative flex justify-between items-center pr-4 py-3 border-b">
        {/* 좌측 영역 */}
        <div className="flex items-center gap-2">
          {isMainPage ? (
            <>
              <img src={logoIcon} alt="logo" className="w-8 h-8" />
              <div className="text-[2rem] font-bold">{title}</div>
            </>
          ) : (
            <>
              <img src={arrowIcon} alt="arrow" />
              <div className="text-[2rem] font-bold">{title}</div>
            </>
          )}
        </div>

        {/* 우측 영역 */}
        <div className="cursor-pointer">
          {isMainPage ? (
            <img src={settingIcon} alt="setting" />
          ) : (
            <div onClick={handleStatusIconClick}>{statusIcon}</div>
          )}
        </div>
        {showDropdown && meetStatus?.meetRule !== "guest" && (
          <div ref={dropdownRef} className="absolute right-0 top-full">
            <HeaderDropbox
              meetStatus={meetStatus}
              onDelete={handleDeleteClick}
              onEnd={handleEndClick}
              onUpdate={handleUpdateClick}
              onPay={handlePayClick}
              onHide={handleHideClick}
            />
          </div>
        )}
      </header>

      {showConfirmModal && meetStatus && confirmContent && (
        <ConfirmModal
          title={confirmContent.title}
          description={confirmContent.description}
          confirmText={confirmContent.confirmText}
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
}
