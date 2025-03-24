import { useNavigate } from "react-router-dom";
import { useCreateMeetStore } from "../store/useCreateMeetStore";
import { createMeetService } from "../services/createMeetService";
import { updateMeetService } from "../services/updateMeetService";
import { useToast } from "../../common/hooks/useToastMsg";

export const useCreateMeetSubmit = () => {
  const navigate = useNavigate();
  const { meetInfo, isEditMode, editMeetInfo } = useCreateMeetStore();
  const { showToast, isToastVisible, toastMessage } = useToast();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        showToast("로그인이 필요합니다.");
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
        addressDescription, // ✅ 여기 수정됨
      } = meetInfo;

      const finalCost = hasCost ? cost : 0;
      const meetType = category === "기타" ? customType : category;
      const meetAt = `${date.replace(/\./g, "-")}T${time.hour.padStart(2, "0")}:${time.minute.padStart(2, "0")}:00`;

      const requestData = {
        meetIntro: intro,
        meetType,
        address,
        addressDescription: addressDescription, // ✅ 여기 수정됨
        meetAt,
        memberLimit: memberCount,
        totalCost: finalCost,
      };

      if (isEditMode && editMeetInfo) {
        const updateRequestData = {
          meetIntro: editMeetInfo.intro,
          meetType:
            editMeetInfo.category === "기타"
              ? editMeetInfo.customType
              : editMeetInfo.category,
          address: editMeetInfo.address,
          addressDescription: editMeetInfo.addressDescription,
          meetAt: `${editMeetInfo.date.replace(/\./g, "-")}T${editMeetInfo.time.hour.padStart(2, "0")}:${editMeetInfo.time.minute.padStart(2, "0")}:00`,
          memberLimit: editMeetInfo.memberCount,
          totalCost: editMeetInfo.hasCost ? editMeetInfo.cost : 0,
        };

        console.log(updateRequestData);

        const updateRes = await updateMeetService(
          editMeetInfo.meetId,
          updateRequestData,
          token
        );

        if (updateRes.success) {
          showToast("모임이 수정되었어요!");
          navigate(`/${editMeetInfo.meetId}`);
        } else {
          showToast("모임 수정에 실패했어요.");
        }
        return;
      }

      // 생성 모드일 경우
      const createRes = await createMeetService(requestData, token);

      if (createRes.data?.id) {
        showToast("모임이 생성되었어요!");
        navigate(`/${createRes.data.id}`);
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
