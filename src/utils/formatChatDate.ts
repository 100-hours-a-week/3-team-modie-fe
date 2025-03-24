/**
 * ISO 형식 날짜 문자열에서 밀리초 부분을 제거하는 함수
 * 소수점이 있으면 제거하고, 없으면 그대로 반환
 * @param {string} dateTimeing - ISO 형식 날짜 문자열
 * @returns {string} 밀리초가 제거된 날짜 문자열
 */
export const removeMilliseconds = (dateTimeing: string): string => {
  // 문자열이 없는 경우 처리
  if (!dateTimeing) return dateTimeing;

  // 소수점 위치 확인
  const dotIndex = dateTimeing.indexOf(".");

  // 소수점이 없으면 원래 문자열 반환
  if (dotIndex === -1) return dateTimeing;

  // 소수점 이전까지만 반환
  return dateTimeing.substring(0, dotIndex);
};

/**
 * ISO 형식 날짜 문자열을 '2025년 3월 24일' 형식으로 변환
 * 밀리초 부분이 있으면 제거 후 처리
 * @param {string} dateTime - ISO 형식 날짜 문자열 (예: '2025-03-24T00:51:51.826Z')
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatChatDate = (dateTime: string) => {
  // 밀리초 부분 제거
  const cleanDateTime = removeMilliseconds(dateTime);

  // ISO 문자열이거나 다른 날짜 형식인 경우 모두 처리
  const date = new Date(cleanDateTime);

  // 날짜가 유효한지 검사
  if (isNaN(date.getTime())) {
    console.error("유효하지 않은 날짜 형식:", dateTime);
    return "날짜 정보 없음";
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

/**
 * ISO 형식 날짜 문자열에서 시간 정보 추출하여 'HH:MM' 형식으로 반환
 * 밀리초 부분이 있으면 제거 후 처리
 * @param {string} dateTime - ISO 형식 날짜 문자열 (예: '2025-03-24T00:51:51.826Z')
 * @returns {string} 포맷팅된 시간 문자열
 */
export const formatChatTime = (dateTime: string) => {
  // 밀리초 부분 제거
  const cleanDateTime = removeMilliseconds(dateTime);

  const date = new Date(cleanDateTime);

  // 날짜가 유효한지 검사
  if (isNaN(date.getTime())) {
    console.error("유효하지 않은 날짜 형식:", dateTime);
    return "--:--";
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * API 요청 시 날짜 형식을 표준화하는 함수
 * @param {string} dateTime - ISO 형식 날짜 문자열
 * @returns {string} API 요청용으로 포맷된 날짜 문자열
 */
export const formatDateForApi = (dateTime: string) => {
  return removeMilliseconds(dateTime);
};
