import Image from "next/image";

export default function MediaSection({ content, meta, isGrid = false }) {
  return (
    <figure className={isGrid ? "m-0" : "my-10"}>
      <Image
        src={content?.url}
        alt={meta?.alt || ""}
       className={
    isGrid
      ? "w-full h-80 object-cover rounded-2xl"
      : "w-full h-96 object-cover rounded-2xl"
  }
        width={100}
        height={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized="true"
      />
      {meta?.caption && (
        <figcaption className="text-center text-xs text-gray-400 mt-2 tracking-wide">
          {meta.caption}
        </figcaption>
      )}
    </figure>
  );
}
