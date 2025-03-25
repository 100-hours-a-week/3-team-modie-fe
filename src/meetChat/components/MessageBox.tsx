interface MessageBoxProps {
  nickname?: string;
  isMe: boolean;
  isOwner?: boolean;
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
  const containerAlignment = isMe ? "items-end" : "items-start";
  const nicknameAlignment = isMe ? "text-right" : "text-left";
  const messageRowDirection = isMe ? "flex-row-reverse" : "flex-row";
  const bubbleBgColor = isMe ? "bg-grayEe" : "bg-[rgba(144,224,239,0.4)]";

  // 내가 보낸 메시지면 닉네임을 절대 표시하지 않도록 수정
  const displayNickname = isMe ? false : showNickname;

  return (
    <div className={`flex flex-col gap-1 mt-4 ${containerAlignment}`}>
      {displayNickname && (
        <div className={`text-Body1 font-bold ${nicknameAlignment}`}>
          {nickname}
          {isOwner && "(방장)"}
        </div>
      )}
      <div className={`flex items-end max-w-2/3 gap-2 ${messageRowDirection}`}>
        <div className={`px-4 py-2 rounded-xl break-words ${bubbleBgColor}`}>
          <div className="text-Body1 text-black">{content}</div>
        </div>
        <div className="text-Caption2 text-grayBd">{time}</div>
      </div>
    </div>
  );
}
