import { meetType } from "../common/types/meetType";
import { MeetInfo } from "../meetCreate(update)/store/useCreateMeetStore";

export const convertMeetTypeToMeetInfo = (
  meet: meetType
): Promise<MeetInfo> => {
  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(meet.address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const lat = parseFloat(result[0].y);
        const lng = parseFloat(result[0].x);

        resolve({
          meetId: meet.meetId || 0,
          intro: meet.meetIntro,
          category: meet.meetType,
          customType: "",
          meetAt: meet.meetAt,
          date: meet.meetAt.split("T")[0],
          time: {
            hour: meet.meetAt.split("T")[1]?.split(":")[0] || "",
            minute: meet.meetAt.split("T")[1]?.split(":")[1] || "",
          },
          memberCount: meet.memberLimit,
          hasCost: meet.totalCost > 0,
          cost: meet.totalCost,
          address: meet.address,
          addressDescription: meet.addressDescription,
          lat,
          lng,
        });
      } else {
        reject("좌표 변환 실패");
      }
    });
  });
};
