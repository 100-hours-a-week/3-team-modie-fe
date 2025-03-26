interface EditingFormProps {
  bankName: string;
  accountNumber: string;
  setBankName: (value: string) => void;
  setAccountNumber: (value: string) => void;
  bankInputRef: React.RefObject<HTMLInputElement | null>;
  accountInputRef: React.RefObject<HTMLInputElement | null>;
}

export const EditingForm = ({
  bankName,
  accountNumber,
  setBankName,
  setAccountNumber,
  bankInputRef,
  accountInputRef,
}: EditingFormProps) => {
  // 은행명 입력 핸들러 - 10자 제한
  const handleBankNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setBankName(value);
    }
  };

  // 계좌번호 입력 핸들러 - 20자 제한 및 숫자만 허용
  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    // 숫자만 허용하는 정규식 적용
    const numericValue = value.replace(/[^0-9]/g, "");

    if (numericValue.length <= 20) {
      setAccountNumber(numericValue);
    }
  };

  return (
    <div className="pt-[0.4rem]">
      <div className="relative mb-[0.8rem]">
        <input
          type="text"
          placeholder="은행을 입력해 주세요. ex) 신한은행"
          value={bankName}
          onChange={handleBankNameChange}
          ref={bankInputRef}
          className={`w-full text-Body1 text-gray75 font-pretendard focus:outline-none cursor-pointer ${!bankName ? "placeholder:text-grayC8" : ""}`}
          maxLength={10}
        />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="계좌를 입력해 주세요."
          value={accountNumber}
          onChange={handleAccountNumberChange}
          ref={accountInputRef}
          className={`w-full text-[1.6rem] text-gray75 font-pretendard focus:outline-none cursor-pointer ${!accountNumber ? "placeholder:text-grayC8" : ""}`}
          maxLength={20}
        />
      </div>
    </div>
  );
};
