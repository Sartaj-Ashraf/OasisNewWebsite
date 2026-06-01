export default function HeadingSection({ type, content }) {
  const headingClasses = {
    h1: "text-3xl md:text-5xl font-bold mb-6",
    h2: "text-2xl md:text-4xl font-semibold mb-5",
    h3: "text-xl md:text-3xl font-semibold mb-4",
  };

  const Tag = type;

  return (
    <Tag className={headingClasses[type]}>
      {content}
    </Tag>
  );
}