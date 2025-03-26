import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(weekday);
dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
dayjs.locale("ko");

export const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "";
  const date = dayjs(dateStr);
  const dayOfWeek = date.format("ddd"); // 요일 (월, 화, 수...)
  return `${date.format("YYYY/MM/DD")} (${dayOfWeek}) ${date.format("HH:mm")}`;
};
