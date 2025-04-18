import { useNavigate } from "react-router-dom";
import ArrowIcon from "../../assets/arrow.svg?react";
import logoIcon from "../../assets/logo.svg";
import settingIcon from "../../assets/setting.svg";
import { headerType } from "../types/headerType";
import { useMeetStatus } from "../hooks/useMeetStatus";
import HeaderDropbox from "../../meetDetail/components/HeaderDropbox";
import ConfirmModal from "./ConfirmModal";
import { useHeaderConfirmModal } from "../hooks/useHeaderContirmModal";
import { useHeaderDropbox } from "../../meetDetail/hooks/useHeaderDropbox";
import dayjs from "dayjs";
import { useCreateMeetStore } from "../../meetCreate(update)/store/useCreateMeetStore";
import { convertMeetTypeToMeetInfo } from "../../utils/convertMeetTypeToMeetInfo";
import { useMeetStore } from "../../meetDetail/store/getMeetStore";

/**
 * 전역적으로 사용되는 헤더입니다.
 * @author 희진
 */

export default function Header({
  title,
  meetStatus,
  isMainPage,
  canGoHome,
  canGoMeetDetail,
  meetId,
}: headerType) {
  const navigate = useNavigate();
  const statusIcon = useMeetStatus(meetStatus);
  const { setEditMode, setEditMeetInfo } = useCreateMeetStore();
  const { setMeetId } = useMeetStore();
  const toekn = localStorage.getItem("accessToken");

  const {
    showConfirmModal,
    openConfirmModal,
    closeConfirmModal,
    handleConfirm,
    getConfirmModalContent,
  } = useHeaderConfirmModal(meetStatus);

  const { showDropdown, dropdownRef, toggleDropdown, closeDropdown } =
    useHeaderDropbox(
      Boolean(meetStatus && meetStatus.meetRule === "guest"),
      showConfirmModal
    );

  const handleStatusIconClick = () => {
    if (!meetStatus) return;

    const isOwner = meetStatus.meetRule === "owner";
    const isBeforeMeet = dayjs().isBefore(dayjs(meetStatus.meetAt));

    if (!isOwner && isBeforeMeet) {
      openConfirmModal("exit");
    } else {
      toggleDropdown();
    }
  };

  const handleBack = () => {
    if (canGoHome) {
      navigate("/");
    } else if (canGoMeetDetail) {
      navigate(`/${meetId}`);
    } else {
      navigate(-1);
    }
  };

  const confirmContent = getConfirmModalContent();

  return (
    <>
      <header
        className={`relative flex justify-between items-center px-[2rem] pr-4 ${isMainPage ? "py-[1.35rem]" : "py-[1.1rem]"}`}
      >
        <div className="flex items-center gap-2">
          {isMainPage ? (
            <>
              <img
                src={logoIcon}
                alt="logo"
                className="w-[6.4rem] h-auto ml-4"
              />
            </>
          ) : (
            <>
              {toekn && (
                <ArrowIcon onClick={handleBack} className="cursor-pointer" />
              )}
              <div className="text-Title font-bold truncate max-w-[calc(100vw-160px)]">
                {title}
              </div>
            </>
          )}
        </div>

        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // 버블링 방지
            handleStatusIconClick();
          }}
        >
          {isMainPage ? (
            <button onClick={() => navigate("/my")}>
              <img src={settingIcon} alt="setting" className="cursor-pointer" />
            </button>
          ) : toekn ? (
            !meetStatus?.completedAt && statusIcon
          ) : (
            <button
              onClick={() => {
                localStorage.setItem(
                  "afterLoginRedirect",
                  window.location.pathname
                );
                navigate("/login");
              }}
              className="px-4 py-1.5 bg-primary text-white bg-primaryDark3 text-Body2 font-semibold rounded-lg shadow-sm hover:brightness-105 transition cursor-pointer"
            >
              로그인
            </button>
          )}
        </div>

        {showDropdown && meetStatus?.meetRule !== "guest" && meetStatus && (
          <div ref={dropdownRef} className="absolute right-0 top-full">
            <HeaderDropbox
              meetStatus={meetStatus}
              onDelete={() => openConfirmModal("delete")}
              onEnd={() => openConfirmModal("end")}
              onUpdate={async () => {
                const converted = await convertMeetTypeToMeetInfo(meetStatus);

                // 순서 바꿔서 먼저 editMeetInfo 설정
                setEditMeetInfo(converted);
                setEditMode(true);

                // 2. 다음 이벤트 루프에서 이동하도록 처리
                setTimeout(() => {
                  navigate("/meet/create/type");
                }, 0);
              }}
              onPay={() => {
                setMeetId(meetStatus.meetId);
                navigate("/paying");
              }}
            />
          </div>
        )}
      </header>

      {showConfirmModal && confirmContent && (
        <ConfirmModal
          title={confirmContent.title}
          description={confirmContent.description}
          confirmText={confirmContent.confirmText}
          cancelText="취소"
          onConfirm={handleConfirm}
          onCancel={() => {
            closeConfirmModal();
            closeDropdown(); // 모달 닫을 때 드롭다운도 닫기
          }}
        />
      )}
    </>
  );
}
