import { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo.svg";
import cn from "../../utils/cn.ts";

export default function My() {
  const [isEditing, setIsEditing] = useState(false);
  const [bankName, setBankName] = useState("국민은행");
  const [accountNumber, setAccountNumber] = useState("1234567890");
  const bankInputRef = useRef(null);
  const accountInputRef = useRef<HTMLInputElement>(null);

  // 수정 모드로 변경될 때 계좌번호 입력 필드로 포커스
  useEffect(() => {
    if (isEditing && accountInputRef.current) {
      accountInputRef.current.focus();
    }
  }, [isEditing]);

  const textStyles = {
    title2: "font-pretendard font-normal text-Title2",
    body1: "font-pretendard font-normal text-Body1",
    body2: "font-pretendard font-normal text-Body2",
    body3: "font-pretendard font-normal text-Body3",
  };

  const colorStyles = {
    black: "text-black",
    gray40: "text-gray40",
    gray78: "text-gray78",
    lightGray: "text-grayC8",
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save logic would go here
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={cn(
        "flex flex-col w-screen h-screen bg-grayEe",
        "justify-center items-center pb-[2.4rem]"
      )}
    >
      <header className="my-page-header"></header>

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
        <p className={cn(textStyles.title2, colorStyles.black, "text-center")}>
          헤이주르륵
        </p>
      </div>

      <div
        className={cn(
          "rounded-[1.2rem] bg-white flex flex-col",
          "w-[calc(100%-4rem)] max-w-[40rem] h-fit",
          "px-[2.4rem] py-[2rem] mx-[2rem]"
        )}
      >
        {/* 계좌 번호 */}
        <div className="flex w-full justify-between items-center mb-[1.6rem]">
          <p className="font-pretendard text-[1.8rem] text-gray40">계좌번호</p>
          <button
            className="flex items-center font-pretendard text-grayC8 text-[1.4rem]"
            onClick={handleEditToggle}
          >
            {isEditing ? "수정완료" : "수정하기"}
            <span className="ml-1">{isEditing ? null : ">"}</span>
          </button>
        </div>

        {isEditing ? (
          <div className="pt-[0.4rem]">
            <input
              type="text"
              placeholder="은행을 입력해 주세요. ex) 신한은행"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              ref={bankInputRef}
              className="w-full text-[1.6rem] text-gray40 font-pretendard mb-[0.8rem] focus:outline-none"
            />
            <input
              type="text"
              placeholder="계좌를 입력해 주세요."
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              ref={accountInputRef}
              className="w-full text-[1.6rem] text-gray40 font-pretendard focus:outline-none"
            />
          </div>
        ) : (
          <>
            {bankName && accountNumber ? (
              <div className="pt-[0.4rem]">
                <p className="text-[1.6rem] text-gray40 mb-[0.8rem]">
                  {bankName}
                </p>
                <p className="text-[1.6rem] text-gray40">{accountNumber}</p>
              </div>
            ) : (
              <div className="py-[1rem] flex flex-col gap-[1.2rem]">
                <p className="text-[1.6rem] text-grayBd">
                  은행을 입력해 주세요. ex) 신한은행
                </p>
                <p className="text-[1.6rem] text-grayBd">
                  계좌를 입력해 주세요.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex-grow"></div>

      {/* 하단 버튼 */}
      <div className="flex w-full h-fit justify-center gap-[0.8rem]">
        <p className={cn(textStyles.body2, colorStyles.gray78)}>로그아웃</p>
        <p className={cn(textStyles.body2, colorStyles.gray78)}>|</p>
        <p className={cn(textStyles.body2, colorStyles.gray78)}>이용약관</p>
      </div>
    </div>
  );
}
