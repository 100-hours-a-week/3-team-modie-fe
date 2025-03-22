import { useNavigate } from "react-router-dom";
import { useCreateMeetStore } from "../store/useCreateMeetStore";
import { createMeetService } from "../services/createMeetService";
import { useToast } from "../../common/hooks/useToastMsg";

export const useCreateMeetSubmit = () => {
  const navigate = useNavigate();
  const { meetInfo } = useCreateMeetStore();
  const { showToast, isToastVisible, toastMessage } = useToast();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        showToast("로그인이 필요합니다.");
      }

      const {
        intro,
        category,
        customType,
        date,
        time,
        hasCost,
        cost,
        memberCount,
        address,
        addressDetail,
      } = meetInfo;

      // 비용이 없으면 cost를 0으로 설정
      const finalCost = hasCost ? cost : 0;

      // category가 "기타"일 경우 customType을 meetType으로 사용
      const meetType = category === "기타" ? customType : category;

      const meetAt = `${date.replace(/\./g, "-")}T${time.hour.padStart(2, "0")}:${time.minute.padStart(2, "0")}:00`;

      const requestData = {
        meetIntro: intro,
        meetType,
        address,
        addressDescription: addressDetail,
        meetAt,
        memberLimit: memberCount,
        totalCost: finalCost,
      };

      if (token) {
        const res = await createMeetService(requestData, token);

        if (res.data?.id) {
          navigate(`/${res.data.id}`);
        }
      }
    } catch (err) {
      console.error("모임 생성 실패:", err);
      showToast("모임 생성 중 오류가 발생했어요.");
    }
  };

  return { handleSubmit, isToastVisible, toastMessage };
};
