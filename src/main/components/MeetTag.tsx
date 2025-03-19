interface MeetTagProps {
  name?: string;
}

export default function MeetTag({ name }: MeetTagProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-2 py-0.5 rounded border-[0.5px] border-primaryDark3">
      <div className="text-primaryDark3 font-pretendard text-Caption2 leading-[1.4rem]">
        {name || "태그명"}
      </div>
    </div>
  );
}
