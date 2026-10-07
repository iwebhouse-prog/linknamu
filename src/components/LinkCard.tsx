type LinkCardProps = {
  title: string;
  url: string;
};

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-3xl border border-card-border bg-card px-6 py-4.5 text-center text-[15px] font-semibold shadow-[0_6px_24px_-12px_rgb(var(--shadow)/0.35)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-card-hover hover:shadow-[0_10px_28px_-12px_rgb(var(--shadow)/0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none"
    >
      {title}
    </a>
  );
}
