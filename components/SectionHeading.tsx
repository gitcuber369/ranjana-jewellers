export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-serif text-3xl text-ink md:text-5xl">{title}</h2>
      <p className="mt-2 text-base text-ink/60 md:text-lg">{subtitle}</p>
    </div>
  );
}
