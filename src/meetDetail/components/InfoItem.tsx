import { ReactNode } from "react";

interface InfoItemProps {
  icon: ReactNode;
  title: string;
  content: string;
}

export default function InfoItem({ icon, title, content }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 mt-4">
      <div className="text-primaryDark3">{icon}</div>
      <div>
        <div className="text-Body2 font-bold">{title}</div>
        <div className="text-Body3 text-gray75">{content}</div>
      </div>
    </div>
  );
}
