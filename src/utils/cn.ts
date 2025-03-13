// 길어지는 tailwind CSS 줄이는 용도
export default function cn(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(" ");
}
