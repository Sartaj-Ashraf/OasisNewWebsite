import ParagraphSection from "./ParagraphSection";
import QuoteSection from "./QuoteSection";
import ListSection from "./ListSection";
import MediaSection from "./MediaSection";
import HeadingSection from "./HeadingSection";

function groupSections(sections) {
  return sections.reduce((acc, section) => {
    if (section.type === "image") {
      const last = acc[acc.length - 1];
      if (last?._type === "imageGroup") {
        last.items.push(section);
        return acc;
      }
      acc.push({ _type: "imageGroup", items: [section], id: section.id });
    } else {
      acc.push(section);
    }
    return acc;
  }, []);
}

export default function ContentRenderer({ sections = [] }) {
  if (!Array.isArray(sections)) return null;

  const grouped = groupSections(sections);

  const renderSection = (section, index) => {
    if (section._type === "imageGroup") {
      const isGrid = section.items.length >= 2;
      return (
        <div
          key={section.id || index}
          className={isGrid ? "grid grid-cols-2 gap-2.5 my-10" : ""}
        >
          {section.items.map((img, i) => (
            <MediaSection
              key={img.id || i}
              content={img.content}
              meta={img.meta}
              isGrid={isGrid}
            />
          ))}
        </div>
      );
    }

    switch (section.type) {
      case "h1":
      case "h2":
      case "h3":
        return (
          <HeadingSection
            key={section.id || index}
            type={section.type}
            content={section.content}
          />
        );

      case "p":
        return (
          <ParagraphSection
            key={section.id || index}
            content={section.content}
          />
        );

      case "quote":
        return (
          <QuoteSection
            key={section.id || index}
            content={section.content}
          />
        );

      case "list":
        return (
          <ListSection
            key={section.id || index}
            content={section.content}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-1">
      {grouped.map((section, index) => renderSection(section, index))}
    </div>
  );
}