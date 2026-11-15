import Image from "next/image";

export default function Avatar({ name, photo, size = 44, className = "" }: { name: string; photo?: string; size?: number; className?: string }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return photo ? (
    <Image src={photo} alt={name} width={size} height={size} className={`shrink-0 rounded-full object-cover ${className}`} style={{ width: size, height: size }} />
  ) : (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}
