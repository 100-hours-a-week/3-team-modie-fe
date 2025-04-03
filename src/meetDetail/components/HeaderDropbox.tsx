import { useMeetStatusInfo } from "../../common/hooks/useMeetStatusInfo";
import { meetType } from "../../common/types/meetType";
import cn from "../../utils/cn";

interface HeaderDropboxProps {
  meetStatus: meetType;
  onDelete: () => void;
  onEnd: () => void;
  onUpdate: () => void;
  onPay: () => void;
}

/**
 * 모임 상세 페이지의 헤더 우측 아이콘에 대한 드롭다운 컴포넌트입니다.
 * @author 희진
 */

export default function HeaderDropbox({
  meetStatus,
  onDelete,
  onEnd,
  onUpdate,
  onPay,
}: HeaderDropboxProps) {
  const status = useMeetStatusInfo(meetStatus);

  if (!status) return null;

  const renderButton = (
    text: string,
    onClick: () => void,
    className?: string
  ) => (
    <button
      className={cn("py-3 w-full text-center cursor-pointer", className)}
      onClick={onClick}
    >
      {text}
    </button>
  );

  return (
    !status.isEnded && (
      <div
        className={cn(
          "absolute right-4 -top-4 bg-white shadow-md rounded-[6px] border-1 border-grayBd",
          "z-50 text-Body2 w-[10.2rem] cursor-pointer text-center"
        )}
      >
        {status.isOwner && status.isBeforeMeet && (
          <>
            {renderButton("모임 수정하기", onUpdate)}
            {renderButton(
              "모임 삭제하기",
              onDelete,
              "text-activeRed border-t-1 border-grayBd"
            )}
          </>
        )}

        {status.isOwner && !status.isBeforeMeet && !status.isEnded && (
          <>
            {renderButton("모임 정산하기", onPay)}
            {renderButton("모임 종료하기", onEnd, "border-t-1 border-grayBd")}
          </>
        )}
      </div>
    )
  );
}
