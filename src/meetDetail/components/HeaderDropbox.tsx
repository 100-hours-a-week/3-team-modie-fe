import { useMeetStatusInfo } from "../../common/hooks/useMeetStatusInfo";
import { meetType } from "../../common/types/meetType";
import cn from "../../utils/cn";

interface HeaderDropboxProps {
  meetStatus: meetType["data"];
  onDelete: () => void;
  onEnd: () => void;
  onUpdate: () => void;
  onPay: () => void;
  onHide: () => void;
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
  onHide,
}: HeaderDropboxProps) {
  const status = useMeetStatusInfo(meetStatus);

  if (!status) return null;

  return (
    <div
      className={cn(
        "absolute right-4 -top-4 bg-white shadow-md rounded-[6px] border-1 border-grayBd",
        "z-50 text-sm w-[10.2rem] cursor-pointer text-center"
      )}
    >
      {status.isOwner && status.isBeforeMeet && (
        <>
          <div className="py-3" onClick={onUpdate}>
            모임 수정하기
          </div>
          <div
            className="py-3 text-activeRed border-t-1 border-grayBd"
            onClick={onDelete}
          >
            모임 삭제하기
          </div>
        </>
      )}

      {status.isOwner && !status.isBeforeMeet && !status.isEnded && (
        <>
          <div className="py-3" onClick={onPay}>
            모임 정산하기
          </div>
          <div className="py-3 border-t-1 border-grayBd" onClick={onEnd}>
            모임 종료하기
          </div>
        </>
      )}

      {status.isEnded && (
        <div className="py-3" onClick={onHide}>
          모임 숨기기
        </div>
      )}
    </div>
  );
}
