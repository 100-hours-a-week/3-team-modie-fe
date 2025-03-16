interface ConfirmModalProps {
  title: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 더블체크용 모달입니다.
 * @author 희진
 */

export default function ConfirmModal({
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-100 bg-black/40">
      <div className="flex flex-col bg-white rounded-[12px] shadow-md py-[2rem] px-[1.6rem] w-[320px] text-left gap-[0.8rem]">
        <div className="text-base font-bold">{title}</div>
        <div className="text-sm text-black font-normal ">{description}</div>
        <div className="flex justify-between gap-[1.2rem] ml-[15rem]">
          <button
            onClick={onConfirm}
            className="flex-1 text-activeRed  text-sm font-bold"
          >
            {confirmText}
          </button>
          <button onClick={onCancel} className="flex-1 text-sm">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
