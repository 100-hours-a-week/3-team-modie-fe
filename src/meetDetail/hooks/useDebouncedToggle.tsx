import { useEffect, useRef, useState } from "react";

/**
 * 토글 버튼에 대해 디바운싱을 적용합니다.
 * @author 희진
 */

export const useDebouncedToggle = (
  initial: boolean = false,
  onChange?: (checked: boolean) => boolean | Promise<boolean>,
  delay: number = 700
) => {
  const [checked, setChecked] = useState(initial);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const toggle = () => {
    const newChecked = !checked;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      const shouldUpdate = await onChange?.(newChecked);

      if (shouldUpdate) {
        setChecked(newChecked);
      }
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return { checked, toggle };
};
