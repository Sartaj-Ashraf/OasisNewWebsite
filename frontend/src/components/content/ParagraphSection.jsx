export default function ParagraphSection({ content }) {
  return (
    <p className="font-sans text-base md:text-[17px] leading-[1.85] text-gray-500 mb-5">
      {content}
    </p>
  );
}