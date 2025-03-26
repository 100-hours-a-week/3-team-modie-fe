import cn from "../../utils/cn";

interface FooterButtonsProps {
  openLogoutModal: () => void;
  goToTerms: () => void;
  styles: {
    text: {
      body2: string;
      [key: string]: string;
    };
    color: {
      gray78: string;
      [key: string]: string;
    };
  };
}

/**
 * 마이페이지 하단 컴포넌트
 * @author 희진
 */

export const FooterButtons = ({
  openLogoutModal,
  goToTerms,
  styles,
}: FooterButtonsProps) => (
  <div className="fixed bottom-7 flex w-full h-fit justify-center gap-[0.8rem]">
    <button onClick={openLogoutModal} className="cursor-pointer">
      <p className={cn(styles.text.body2, styles.color.gray78)}>로그아웃</p>
    </button>

    <p className={cn(styles.text.body2, styles.color.gray78)}>|</p>

    <button onClick={goToTerms} className="cursor-pointer">
      <p className={cn(styles.text.body2, styles.color.gray78)}>이용약관</p>
    </button>
  </div>
);
