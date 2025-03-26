import Header from "../../common/components/Header.tsx";
import ConfirmModal from "../../common/components/ConfirmModal";
import { useMyPage } from "../hooks/useMyPage.tsx";
import ToastMsg from "../../common/components/ToastMsg.tsx";
import { EditingForm } from "../components/EditingForm.tsx";
import { AccountDisplay } from "../components/AccountDisplay.tsx";
import { FooterButtons } from "../components/FooterButtons.tsx";
import { myPageStyles } from "../styles/myPageStyles.ts";
import logo from "../../assets/logo.svg";
import cn from "../../utils/cn.ts";
import AccountCardSkeleton from "../components/MySekeleton.tsx";
import UserInfoSkeleton from "../components/UserInfoSkeleton.tsx";

export default function My() {
  const {
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
  } = useMyPage();

  return (
    <>
      <div className={cn("flex flex-col min-h-screen bg-grayEe pb-[2.4rem]")}>
        <Header title="마이페이지" />

        <div className="flex flex-col h-full bg-grayEe items-center ">
          {/* 사용자 정보 */}
          {isLoading ? (
            <UserInfoSkeleton />
          ) : (
            <div
              className={cn(
                "flex flex-col justify-center items-center",
                "gap-[1.2rem] self-stretch pt-[1.6rem] pb-[2rem]"
              )}
            >
              <div className="bg-[#D6D6D6] rounded-full w-[8rem] h-[8rem]">
                <img
                  className="rounded-full object-cover w-full h-full"
                  src={profileImg || logo}
                  alt="프로필 이미지"
                />
              </div>
              <p
                className={cn(
                  myPageStyles.text.title2,
                  myPageStyles.color.black,
                  "text-left break-words max-w-full px-4"
                )}
                style={{
                  maxWidth: "20rem",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {(() => {
                  const nickname = userName || "";
                  return nickname.length > 20
                    ? `${nickname.substring(0, 20)}`
                    : nickname;
                })()}
              </p>
            </div>
          )}

          {isLoading ? (
            <AccountCardSkeleton />
          ) : (
            <div
              className={cn(
                "rounded-[1.2rem] bg-white flex flex-col",
                "w-[calc(100%-4rem)] max-w-[40rem] h-fit",
                "px-[2.4rem] py-[2rem] mx-[2rem]"
              )}
            >
              <div className="flex w-full justify-between items-center mb-[1.6rem]">
                <p className="font-pretendard text-[1.8rem] text-gray40">
                  계좌번호
                </p>
                <button
                  className="flex items-center text-[1.4rem] cursor-pointer"
                  onClick={handleEditToggle}
                  style={{ color: "#c8c8c8" }}
                >
                  {isEditing ? "수정완료" : "수정하기"}
                  <span className="ml-1">{">"}</span>
                </button>
              </div>

              {isEditing ? (
                <EditingForm
                  bankName={bankName}
                  accountNumber={accountNumber}
                  setBankName={setBankName}
                  setAccountNumber={setAccountNumber}
                  bankInputRef={bankInputRef}
                  accountInputRef={accountInputRef}
                />
              ) : (
                <AccountDisplay
                  bankName={bankName}
                  accountNumber={accountNumber}
                />
              )}
            </div>
          )}

          <div className="fixed bottom-29 w-full flex justify-center">
            <ToastMsg active={isToastVisible} description={toastMessage} />
          </div>

          {/* 하단 버튼 */}
          <FooterButtons
            openLogoutModal={openLogoutModal}
            goToTerms={goToTerms}
            styles={myPageStyles}
          />
        </div>

        {/* 로그아웃 확인 모달 */}
        {showConfirmModal && confirmContent && (
          <ConfirmModal
            title={confirmContent.title}
            description={confirmContent.description}
            confirmText={confirmContent.confirmText}
            cancelText="취소"
            onConfirm={handleConfirm}
            onCancel={closeConfirmModal}
          />
        )}
      </div>
    </>
  );
}
