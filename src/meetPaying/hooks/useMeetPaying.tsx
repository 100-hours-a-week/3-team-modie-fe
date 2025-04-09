import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAmountService } from "../services/updateAmountService";
import { useMeetStore } from "../../meetDetail/store/getMeetStore";
import { useToast } from "../../common/hooks/useToastMsg";
import * as Sentry from "@sentry/react";

export const useMeetPaying = () => {
  const [cost, setCost] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const MIN_AMOUNT = 1000;
  const MAX_AMOUNT = 10000000;

  const { meetId } = useMeetStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleCostChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const numericAmount = parseInt(numericValue) || 0;

    if (numericAmount > MAX_AMOUNT) {
      setError(`최대 금액은 ${formatCurrency(MAX_AMOUNT.toString())}원입니다.`);
      setIsValid(false);
      setCost(MAX_AMOUNT.toString());
    } else if (numericAmount < MIN_AMOUNT && numericValue !== "") {
      setError(`최소 금액은 ${formatCurrency(MIN_AMOUNT.toString())}원입니다.`);
      setIsValid(false);
      setCost(numericValue);
    } else {
      setError("");
      setIsValid(true);
      setCost(numericValue);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      showToast("로그인이 필요합니다.");
      navigate("/login");
    }

    if (!isValid) return;
    const costNum = parseInt(cost) || 0;

    try {
      if (!meetId || !token) {
        showToast("잘못된 접근입니다.");
      } else {
        const res = await updateAmountService(meetId, token, costNum);
        if (res?.success) {
          showToast(`정산 금액 ${formattedCost}원이 저장되었습니다.`);
          navigate(`/${meetId}`);
        }
      }
    } catch (e) {
      Sentry.captureException(e, {
        tags: { feature: "meet-paying" },
        extra: { message: "정산 금액 저장 실패", meetId },
      });
      showToast("정산 등록에 실패했어요.");
    }
  };

  const formatCurrency = (value: string): string => {
    return Number(value).toLocaleString();
  };

  const formattedCost = cost ? formatCurrency(cost) : "";

  return {
    cost,
    formattedCost,
    error,
    isValid,
    handleCostChange,
    handleSave,
  };
};
