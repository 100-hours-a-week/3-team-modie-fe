import moveIcon from "../assets/move.svg";
import foodIcon from "../assets/food.svg";
import workoutIcon from "../assets/workout.svg";
import etcIcon from "../assets/etc.svg";

/**
 * 카테고리명에 따라 아이콘을 반환합니다.
 * @author 희진
 */

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case "이동":
      return moveIcon;
    case "음식":
      return foodIcon;
    case "운동":
      return workoutIcon;
    case "기타":
    default:
      return etcIcon;
  }
};
