import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6 py-16 sm:px-8 sm:py-24">
      <div className="w-full max-w-md">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <ul className="mt-10 flex flex-col gap-4">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard title={link.title} url={link.url} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
