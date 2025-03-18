interface InfoItemProps {
  icon: string;
  title: string;
  content: string;
}

export default function InfoItem({ icon, title, content }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 mt-4">
      <img src={icon} alt={title} />
      <div>
        <div className="text-Body2 font-bold">{title}</div>
        <div className="text-Body3 text-gray75">{content}</div>
      </div>
    </div>
  );
}
