import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={128}
        height={128}
        preload
        unoptimized
        className="size-28 rounded-full object-cover ring-4 ring-white/80 shadow-[0_12px_32px_-12px_rgb(var(--shadow)/0.5),0_2px_6px_rgb(var(--shadow)/0.12)] sm:size-32 dark:ring-white/10"
      />
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-[1.75rem]">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-balance text-muted">{bio}</p>
    </header>
  );
}
