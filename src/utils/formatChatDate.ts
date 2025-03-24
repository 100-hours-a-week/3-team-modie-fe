/**
 * ISO 형식 날짜 문자열을 '2025년 3월 24일' 형식으로 변환
 * @param {string} dateTimeStr - ISO 형식 날짜 문자열 (예: '2025-03-24T00:51:51.826Z')
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatChatDate = (dateTimeStr: string) => {
  // ISO 문자열이거나 다른 날짜 형식인 경우 모두 처리
  const date = new Date(dateTimeStr);

  // 날짜가 유효한지 검사
  if (isNaN(date.getTime())) {
    console.error("유효하지 않은 날짜 형식:", dateTimeStr);
    return "날짜 정보 없음";
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

/**
 * ISO 형식 날짜 문자열에서 시간 정보 추출하여 'HH:MM' 형식으로 반환
 * @param {string} dateTimeStr - ISO 형식 날짜 문자열 (예: '2025-03-24T00:51:51.826Z')
 * @returns {string} 포맷팅된 시간 문자열
 */
export const formatChatTime = (dateTimeStr: string) => {
  const date = new Date(dateTimeStr);

  // 날짜가 유효한지 검사
  if (isNaN(date.getTime())) {
    console.error("유효하지 않은 날짜 형식:", dateTimeStr);
    return "--:--";
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};
