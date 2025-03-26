interface AccountDisplayProps {
  bankName: string;
  accountNumber: string;
}

/**
 * 계좌번호 입력, 수정 컴포넌트
 * @author 희진
 */

export const AccountDisplay = ({
  bankName,
  accountNumber,
}: AccountDisplayProps) => (
  <div className="pt-[0.4rem]">
    {/* 은행명 표시 - 값이 있으면 보여주고, 없으면 안내 메시지 */}
    {bankName ? (
      <p className="text-[1.6rem] text-gray40 mb-[0.8rem]">
        {bankName.length > 10 ? `${bankName.slice(0, 10)}` : bankName}
      </p>
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
