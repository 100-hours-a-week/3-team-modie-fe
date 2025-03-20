import { useNavigate } from "react-router-dom";
import { useCreateMeetStore } from "../store/useCreateMeetStore";
import { createMeetService } from "../services/createMeetService";

export const useCreateMeetSubmit = () => {
  const navigate = useNavigate();
  const { meetInfo } = useCreateMeetStore();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const {
        intro,
        category,
        customType,
        date,
        time,
        cost,
        memberCount,
        address,
        addressDetail,
      } = meetInfo;

      const meetType = category === "직접입력" ? customType : category;
      const meetAt = `${date.replace(/\./g, "-")}T${time.hour.padStart(2, "0")}:${time.minute.padStart(2, "0")}:00`;

      const requestData = {
        meetIntro: intro,
        meetType,
        address,
        addressDescription: addressDetail,
        meetAt,
        memberLimit: memberCount,
        totalCost: cost,
      };

      const res = await createMeetService(requestData, token);

      if (res.data?.id) {
        alert("모임 생성 성공!");
        navigate(`/meet/${res.data.id}`);
      }
    } catch (err) {
      console.error("모임 생성 실패", err);
      alert("모임 생성 중 오류가 발생했어요.");
    }
  };

  return { handleSubmit };
};
