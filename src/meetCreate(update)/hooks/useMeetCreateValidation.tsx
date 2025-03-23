import { useMemo } from "react";

/**
 * 모임 생성시 입력값의 유효성을 검사하는 커스텀 훅
 * @author 희진
 */

export const useMeetCreateValidation = ({
  intro,
  category,
  customType,
}: {
  intro: string;
  category: string;
  customType: string;
}) => {
  const isValid = useMemo(() => {
    if (!intro.trim()) return false;
    if (!category) return false;
    if (category === "기타" && !customType.trim()) return false;
    return true;
  }, [intro, category, customType]);

  return { isValid };
};
