import logo from "../../assets/logo.svg";
import cn from "../../utils/cn.ts";
import Header from "../../common/components/Header.tsx";
import ConfirmModal from "../../common/components/ConfirmModal";
import { useMyPage } from "../hooks/useMyPage.tsx";

// 스타일 정의
const styles = {
  text: {
    title2: "font-pretendard font-normal text-Title2",
    body1: "font-pretendard font-normal text-Body1",
    body2: "font-pretendard font-normal text-Body2",
    body3: "font-pretendard font-normal text-Body3",
  },
  color: {
    black: "text-black",
    gray40: "text-gray40",
    gray78: "text-gray78",
    lightGray: "text-grayC8",
  },
};

export default function My() {
  const {
    isEditing,
    bankName,
    accountNumber,
    showConfirmModal,
    confirmContent,
    bankInputRef,
    accountInputRef,
    handleEditToggle,
    setBankName,
    setAccountNumber,
    openLogoutModal,
    closeConfirmModal,
    handleConfirm,
    goToTerms,
  } = useMyPage();

  return (
    <>
      <div className={cn("flex flex-col min-h-screen bg-grayEe pb-[2.4rem]")}>
        <Header title="마이페이지" />

        <div className="flex flex-col h-full bg-grayEe items-center ">
          {/* 사용자 정보 */}
          <div
            className={cn(
              "flex flex-col justify-center items-center",
              "gap-[1.2rem] self-stretch pt-[1.6rem] pb-[2rem]"
            )}
          >
            <div className="bg-[#D6D6D6] rounded-full w-[8rem] h-[8rem]">
              <img
                className="rounded-full object-cover w-full h-full"
                src={logo}
                alt="프로필 이미지"
              />
            </div>
            <p
              className={cn(
                styles.text.title2,
                styles.color.black,
                "text-center"
              )}
            >
              헤이주르륵
            </p>
          </div>

          {/* 계좌 정보 카드 */}
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
                className="flex items-center text-[1.4rem]"
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

          {/* 하단 버튼 */}
          <FooterButtons
            openLogoutModal={openLogoutModal}
            goToTerms={goToTerms}
            styles={styles}
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

// 하위 컴포넌트 타입 정의
interface EditingFormProps {
  bankName: string;
  accountNumber: string;
  setBankName: (value: string) => void;
  setAccountNumber: (value: string) => void;
  bankInputRef: React.RefObject<HTMLInputElement | null>;
  accountInputRef: React.RefObject<HTMLInputElement | null>;
}

interface AccountDisplayProps {
  bankName: string;
  accountNumber: string;
}

interface FooterButtonsProps {
  openLogoutModal: () => void;
  goToTerms: () => void;
  styles: {
    text: {
      body2: string;
      [key: string]: string;
    };
    color: {
      gray78: string;
      [key: string]: string;
    };
  };
}

// 하위 컴포넌트들
const EditingForm = ({
  bankName,
  accountNumber,
  setBankName,
  setAccountNumber,
  bankInputRef,
  accountInputRef,
}: EditingFormProps) => (
  <div className="pt-[0.4rem]">
    <input
      type="text"
      placeholder="은행을 입력해 주세요. ex) 신한은행"
      value={bankName}
      onChange={(e) => setBankName(e.target.value)}
      ref={bankInputRef}
      className={`w-full text-[1.6rem] text-gray75 font-pretendard mb-[0.8rem] focus:outline-none ${!bankName ? "placeholder:text-grayC8" : ""}`}
    />
    <input
      type="text"
      placeholder="계좌를 입력해 주세요."
      value={accountNumber}
      onChange={(e) => setAccountNumber(e.target.value)}
      ref={accountInputRef}
      className={`w-full text-[1.6rem] text-gray75 font-pretendard focus:outline-none ${!accountNumber ? "placeholder:text-grayC8" : ""}`}
    />
  </div>
);
const AccountDisplay = ({ bankName, accountNumber }: AccountDisplayProps) => (
  <div className="pt-[0.4rem]">
    {/* 은행명 표시 - 값이 있으면 보여주고, 없으면 안내 메시지 */}
    {bankName ? (
      <p className="text-[1.6rem] text-gray40 mb-[0.8rem]">{bankName}</p>
    ) : (
      <p className="text-[1.6rem] text-grayBd mb-[0.8rem]">
        은행을 입력해 주세요. ex) 신한은행
      </p>
    )}

    {/* 계좌번호 표시 - 값이 있으면 보여주고, 없으면 안내 메시지 */}
    {accountNumber ? (
      <p className="text-[1.6rem] text-gray40">{accountNumber}</p>
    ) : (
      <p className="text-[1.6rem] text-grayBd">계좌를 입력해 주세요.</p>
    )}
  </div>
);

const FooterButtons = ({
  openLogoutModal,
  goToTerms,
  styles,
}: FooterButtonsProps) => (
  <div className="fixed bottom-7 flex w-full h-fit justify-center gap-[0.8rem]">
    <button onClick={openLogoutModal}>
      <p className={cn(styles.text.body2, styles.color.gray78)}>로그아웃</p>
    </button>

    <p className={cn(styles.text.body2, styles.color.gray78)}>|</p>

    <button onClick={goToTerms}>
      <p className={cn(styles.text.body2, styles.color.gray78)}>이용약관</p>
    </button>
  </div>
);
