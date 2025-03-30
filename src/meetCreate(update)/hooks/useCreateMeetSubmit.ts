import { useNavigate } from "react-router-dom";
import { useCreateMeetStore } from "../store/useCreateMeetStore";
import { createMeetService } from "../services/createMeetService";
import { updateMeetService } from "../services/updateMeetService";
import { useToast } from "../../common/hooks/useToastMsg";

export const useCreateMeetSubmit = () => {
  const navigate = useNavigate();
  const { meetInfo, isEditMode, editMeetInfo, resetMeetInfo } =
    useCreateMeetStore();
  const { showToast, isToastVisible, toastMessage } = useToast();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        showToast("로그인이 필요합니다.");
        navigate("/login");
        return;
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
        addressDescription,
      } = meetInfo;

      const finalCost = hasCost ? cost : 0;
      const meetType = category === "기타" ? customType : category;
      const meetAt = `${date.replace(/\./g, "-")}T${time.hour.padStart(2, "0")}:${time.minute.padStart(2, "0")}:00`;

      const requestData = {
        meetIntro: intro,
        meetType,
        address,
        addressDescription: addressDescription,
        meetAt,
        memberLimit: memberCount,
        totalCost: finalCost,
      };

      if (isEditMode && editMeetInfo) {
        const updateRequestData = {
          meetIntro: meetInfo.intro,
          meetType:
            meetInfo.category === "기타"
              ? meetInfo.customType
              : meetInfo.category,
          address: meetInfo.address,
          addressDescription: meetInfo.addressDescription,
          meetAt: `${meetInfo.date.replace(/\./g, "-")}T${meetInfo.time.hour.padStart(2, "0")}:${meetInfo.time.minute.padStart(2, "0")}:00`,
          memberLimit: meetInfo.memberCount,
          totalCost: meetInfo.hasCost ? meetInfo.cost : 0,
        };

        const updateRes = await updateMeetService(
          meetInfo.meetId,
          updateRequestData,
          token
        );

        if (updateRes.success) {
          showToast("모임이 수정되었어요!");
          navigate(`/${meetInfo.meetId}`);
        } else {
          showToast("모임 수정에 실패했어요.");
        }
        return;
      }

      // 생성 모드일 경우
      const createRes = await createMeetService(requestData, token);

      if (createRes.success) {
        resetMeetInfo();
        showToast("모임이 생성되었어요!");
        setTimeout(() => {
          navigate(`/${createRes.data.meetId}`);
        }, 1000);
      } else {
        showToast("모임 생성에 실패했어요.");
      }
    } catch (err) {
      console.error("모임 생성 실패:", err);
      showToast("모임 생성 중 오류가 발생했어요.");
    }
  };

  return { handleSubmit, isToastVisible, toastMessage };
};
