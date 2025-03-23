/**
 * 2025,3,18,15,57,0,130935000 형식의 채팅 날짜 포맷팅
 * @author 희진
 */

export const formatChatDate = (datetime: string) => {
  const [year, month, day] = datetime.split(",").slice(0, 3);
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

export const formatChatTime = (datetime: string) => {
  const [, , , hour, minute] = datetime.split(",");
  return `${hour}:${minute}`;
};
