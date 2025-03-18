import { useEffect, useRef, useState } from "react";

/**
 * 토글 버튼에 대해 디바운싱을 적용합니다.
 * @author 희진
 */

export const useDebouncedToggle = (
  initial: boolean = false,
  onChange?: (checked: boolean) => void,
  delay: number = 700
) => {
  const [checked, setChecked] = useState(initial);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const toggle = () => {
    const newChecked = !checked;
    setChecked(newChecked); // 즉시 UI 반영

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onChange?.(newChecked);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return { checked, toggle };
};
