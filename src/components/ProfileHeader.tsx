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
        width={112}
        height={112}
        preload
        unoptimized
        className="size-24 rounded-full object-cover ring-4 ring-white shadow-md sm:size-28 dark:ring-neutral-800"
      />
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">{name}</h1>
      <p className="mt-1 text-sm text-neutral-600 sm:text-base dark:text-neutral-400">{bio}</p>
    </header>
  );
}
