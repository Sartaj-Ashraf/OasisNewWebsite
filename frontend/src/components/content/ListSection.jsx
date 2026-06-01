export default function ListSection({ content }) {
  if (!Array.isArray(content)) return null;

  return (
    <ul className="pl-5 my-5 space-y-2">
      {content.map((item, index) => (
        <li
          key={index}
          className="font-sans text-base md:text-[17px] leading-[1.85] text-gray-500 flex gap-3"
        >
          <span className="mt-[0.65rem] w-1 h-1 rounded-full bg-gray-400 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}