import { useNavigate } from "react-router-dom";

interface MeetCardProps {
  meetId: number | undefined;
  meetAt: string;
  memberCount: number;
  memberLimit: number;
}

interface MeetCardHook {
  handleCardClick: () => void;
  isRecruitingActive: () => boolean;
}

export const useMeetCardData = ({
  meetId,
  meetAt,
  memberCount,
  memberLimit,
}: MeetCardProps): MeetCardHook => {
  const navigate = useNavigate();

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    if (meetId) {
      navigate(`/${meetId}`);
    }
  };

  // 모집 중 태그 표시 여부 확인
  const isRecruitingActive = () => {
    // 인원이 가득 찼는지 확인
    const isFull = memberCount >= memberLimit;

    // 모임 날짜가 지났는지 확인
    const meetDate = new Date(meetAt);
    const currentDate = new Date();
    const isPast = meetDate < currentDate;

    return !isFull && !isPast;
  };

  return {
    handleCardClick,
    isRecruitingActive,
  };
};
