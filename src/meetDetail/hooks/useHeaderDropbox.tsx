import { useState, useRef } from "react";
import { useOutsideClick } from "../../common/hooks/useOutsideClick";

/**
 * 드롭다운을 열고 닫음을 관리합니다.
 * @param disabled 드롭다운 닫힘 방지 조건 (예: guest)
 * @param lockWhenModalOpen 모달 열렸을 때 드롭다운 외부 클릭 무시 여부
 * @author 희진
 */

export const useHeaderDropbox = (
  disabled: boolean = false,
  lockWhenModalOpen: boolean = false
) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(
    dropdownRef,
    () => {
      if (!disabled && !lockWhenModalOpen) {
        setShowDropdown(false);
      }
    },
    showDropdown
  );

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const closeDropdown = () => setShowDropdown(false);

  return {
    showDropdown,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
  };
};
