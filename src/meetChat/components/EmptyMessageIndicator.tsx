import React from "react";

/**
 * 빈 메시지 인디케이터 컴포넌트
 * 메시지가 없을 때 표시됨
 */
export const EmptyMessageIndicator = React.memo(() => (
  <div className="flex items-center justify-center h-full text-gray-400">
    아직 메시지가 없습니다. 첫 메시지를 보내보세요!
  </div>
));
