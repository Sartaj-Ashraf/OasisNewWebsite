export default function QuoteSection({ content }) {
  return (
    <blockquote className="border-l-2 border-gray-900 pl-6 my-8">
      <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-gray-900">
        {content}
      </p>
    </blockquote>
  );
}