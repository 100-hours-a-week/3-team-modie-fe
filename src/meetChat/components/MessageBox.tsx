interface MessageBoxProps {
  nickname: string;
  isMe: boolean;
  isOwner: boolean;
  content: string;
  date: string;
  time: string;
  showNickname: boolean;
}

/**
 * 채팅 수신자, 메세지, 시간을 표시하는 컴포넌트
 * @author 희진
 */

export default function MessageBox({
  nickname,
  isMe,
  isOwner,
  content,
  time,
  showNickname,
}: MessageBoxProps) {
  return (
    <div
      className={`flex flex-col gap-1 mt-4 ${isMe ? "items-end" : "items-start"}`}
    >
      {showNickname && (
        <div
          className={`text-Body1 font-bold ${isMe ? "text-right" : "text-left"}`}
        >
          {nickname}
          {isOwner && "(방장)"}
        </div>
      )}
      <div
        className={`flex items-end max-w-2/3 gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`px-4 py-2 rounded-xl break-words ${
            isMe ? "bg-grayEe" : "bg-[rgba(144,224,239,0.4)]"
          }`}
        >
          <div className="text-Body1 text-black">{content}</div>
        </div>
        <div className="text-Caption2 text-grayBd">{time}</div>
      </div>
    </div>
  );
}
