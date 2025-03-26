import { ModalType, MODAL_TYPES } from "../common/types/modalType";

export const getModalText = (type: ModalType, name: string) => {
  const contentMap = {
    [MODAL_TYPES.DELETE]: {
      title: `${name} 삭제하기`,
      description: `${name}을 삭제하면 다시 불러올 수 없습니다.`,
      confirmText: "삭제하기",
    },
    [MODAL_TYPES.END]: {
      title: `${name} 종료하기`,
      description: `${name}을 종료하면 다시 시작할 수 없습니다.`,
      confirmText: "종료하기",
    },
    [MODAL_TYPES.HIDE]: {
      title: `${name} 숨기기`,
      description: `${name}을 숨기면 리스트에서 보이지 않습니다.`,
      confirmText: "숨기기",
    },
    [MODAL_TYPES.EXIT]: {
      title: `${name} 나가기`,
      description: `${name}을 나가면 다시 들어올 수 없습니다.`,
      confirmText: "나가기",
    },
  };

  return contentMap[type];
};
