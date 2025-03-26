import { useEffect, useRef, useState } from "react";
import sendIcon from "../../assets/send.svg";
import cn from "../../utils/cn";

interface ChatInputProps {
  isDisabled: boolean;
  onSend: (message: string) => void;
  onFocusInput?: () => void;
}

/**
 * 채팅 화면 내부 하단에 위치한 채팅 입력창 컴포넌트입니다.
 * @author 희진
 */

export default function ChatInput({
  isDisabled,
  onSend,
  onFocusInput,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setMessage(value);
    }
  };

  // 버튼 클릭으로 메시지 전송
  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  // 엔터키 처리 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  // 4줄 미만일 때 입력칸 height 늘이고
  // 4줄 이상일 때 스크롤 처리
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    const lineHeight = 24;
    const maxLines = 4;
    const maxHeight = lineHeight * maxLines;

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  }, [message]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-grayEe pl-1 pr-4 py-6 z-10">
      <div className="flex flex-col w-full gap-1">
        <div className="flex gap-2 w-full">
          <div className="relative w-full flex justify-center items-center py-3 pl-3 ">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들러 추가
              placeholder={isDisabled ? "종료된 모임입니다" : "메시지 입력"}
              disabled={isDisabled}
              rows={1}
              onFocus={onFocusInput}
              className={cn(
                "w-full resize-none outline-none bg-white min-h-[4rem] max-h-[16rem]",
                `overflow-y-auto pl-3 pt-3 pb-5 pr-6 rounded-md ${
                  isDisabled
                    ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                    : ""
                }`
              )}
              //   IOS 자동 zoom-in 방지
              style={{
                fontSize: "16px",
                transform: "scale(1)",
                transformOrigin: "center",
              }}
            />

            {/* 글자 수 표시 */}
            {!isDisabled && (
              <div className="absolute bottom-3 right-2 text-Caption2 text-grayBd">
                {message.length}/200
              </div>
            )}
          </div>

          {/* 전송 버튼 */}
          {!isDisabled && (
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={`transition-all items-center ${
                message.trim() ? "text-primary" : "cursor-not-allowed"
              }`}
            >
              <img src={sendIcon} alt="sendIcon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
