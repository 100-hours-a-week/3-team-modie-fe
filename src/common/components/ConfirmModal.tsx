import { useRef, useEffect } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onCancel(); // 모달 외부 클릭 시 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100 bg-black/40">
      <div
        ref={modalRef}
        className="flex flex-col bg-white rounded-[12px] shadow-md py-[2rem] px-[1.6rem] w-[320px] text-left gap-[0.8rem]"
      >
        <div className="text-[1.6rem] font-bold">{title}</div>
        <div className="text-[1.4rem] text-black font-normal ">
          {description}
        </div>
        <div className="flex justify-between gap-[1.2rem] ml-[15rem]">
          <button
            onClick={onConfirm}
            className="flex-1 text-activeRed  text-[1.4rem] font-bold"
          >
            {confirmText}
          </button>
          <button onClick={onCancel} className="flex-1 text-[1.4rem]">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
