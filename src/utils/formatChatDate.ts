/**
 * ISO 형식 날짜 문자열을 한국 시간(KST) 기준 '2025년 3월 25일' 형식으로 변환하는 함수
 * @param {string} dateTime - 서버에서 받은 날짜 문자열
 * @returns {string} 포맷팅된 날짜 문자열 (예: '2025년 3월 25일')
 */
export const formatChatDate = (dateTime: string): string => {
  // 입력값 유효성 검사
  if (!dateTime) return "";

  try {
    // 서버에서 이미 KST로 보내주는 시간을 그대로 파싱
    const date = new Date(dateTime);

    date.setHours(date.getHours());

    // 날짜가 유효한지 확인
    if (isNaN(date.getTime())) {
      console.error("유효하지 않은 날짜 형식:", dateTime);
      return "";
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  } catch (error) {
    console.error("날짜 변환 중 오류 발생:", error);
    return "";
  }
};

/**
 * 서버에서 받은 날짜 문자열에서 시간 정보를 'HH:MM' 형식으로 변환하는 함수
 * @param {string} dateTime - 서버에서 받은 날짜 문자열
 * @returns {string} 포맷팅된 시간 문자열 (예: '14:58')
 */
export const formatChatTime = (dateTime: string): string => {
  // 입력값 유효성 검사
  if (!dateTime) return "";

  try {
    // 서버에서 이미 KST로 보내주는 시간을 그대로 파싱
    const date = new Date(dateTime);

    date.setHours(date.getHours());

    // 날짜가 유효한지 확인
    if (isNaN(date.getTime())) {
      console.error("유효하지 않은 시간 형식:", dateTime);
      return "";
    }

    // 시와 분을 2자리 숫자로 포맷팅 (예: '9' -> '09')
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("시간 변환 중 오류 발생:", error);
    return "";
  }
};
