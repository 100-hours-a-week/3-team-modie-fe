import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateAmountService } from "../services/updateAmountService";
import { useMeetStore } from "../../meetDetail/store/getMeetStore";
import { useToast } from "../../common/hooks/useToastMsg";

export const useMeetPaying = () => {
  const [cost, setCost] = useState<string>("");
  const [formattedCost, setFormattedCost] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const MAX_AMOUNT = 10000000;

  const { meetId } = useMeetStore();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setFormattedCost(cost ? formatCurrency(cost) : "");
  }, [cost]);

  const handleCostChange = (value: string) => {
    const numericValue = value.replace(/[^0-9,]/g, "").replace(/,/g, "");
    const numericAmount = parseInt(numericValue) || 0;

    if (numericAmount > MAX_AMOUNT) {
      setError(
        `정산 금액은 ${formatCurrency(MAX_AMOUNT.toString())}원을 초과할 수 없습니다.`
      );
      setIsValid(false);
      setCost(MAX_AMOUNT.toString());
    } else {
      setError("");
      setIsValid(true);
      setCost(numericValue);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return showToast("로그인이 필요합니다.");

    if (!isValid) return;
    const costNum = parseInt(cost) || 0;

    try {
      if (!meetId) {
        showToast("잘못된 접근입니다.");
      } else {
        const res = await updateAmountService(meetId, token, costNum);
        if (res?.success) {
          showToast(`정산 금액 ${formatCurrency(cost)}원이 저장되었습니다.`);
          navigate(`/${meetId}`);
        }
      }
    } catch {
      const message = "정산 등록에 실패했어요.";
      showToast(message);
    }
  };

  const formatCurrency = (value: string): string => {
    if (!value) return "";
    return Number(value).toLocaleString();
  };

  return {
    cost,
    formattedCost,
    error,
    isValid,
    handleCostChange,
    handleSave,
  };
};
