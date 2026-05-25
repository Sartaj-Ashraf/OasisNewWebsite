import {
  AlignLeft, Image as ImageIcon, List, Quote,
  Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   UTILS
───────────────────────────────────────────────────────── */
export function makeSlug(text) {
  return text
    .toString().toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function countWords(blocks) {
  return blocks.reduce((acc, b) => {
    if (b.type === "image") return acc;
    const text = Array.isArray(b.content) ? b.content.join(" ") : String(b.content || "");
    return acc + text.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

/* ─────────────────────────────────────────────────────────
   BLOCK CONFIG  — matches Mongoose enum exactly
───────────────────────────────────────────────────────── */
export const BLOCK_TYPES = [
  { type: "h1", label: "Heading 1", group: "heading", Icon: Heading1, placeholder: "Heading 1…" },
  { type: "h2", label: "Heading 2", group: "heading", Icon: Heading2, placeholder: "Heading 2…" },
  { type: "h3", label: "Heading 3", group: "heading", Icon: Heading3, placeholder: "Heading 3…" },
  { type: "h4", label: "Heading 4", group: "heading", Icon: Heading4, placeholder: "Heading 4…" },
  { type: "h5", label: "Heading 5", group: "heading", Icon: Heading5, placeholder: "Heading 5…" },
  { type: "h6", label: "Heading 6", group: "heading", Icon: Heading6, placeholder: "Heading 6…" },
  { type: "p", label: "Paragraph", group: "content", Icon: AlignLeft, placeholder: "Write something…" },
  { type: "quote", label: "Blockquote", group: "content", Icon: Quote, placeholder: "Add a quote…" },
  { type: "list", label: "List", group: "content", Icon: List, placeholder: "" },
  { type: "image", label: "Image", group: "media", Icon: ImageIcon, placeholder: "" },
];

export const HEADING_STYLE = {
  h1: "text-3xl! md:text-4xl! font-extrabold tracking-tight text-text-primary",
  h2: "text-2xl! font-bold tracking-tight text-text-primary border-b border-border-custom pb-2",
  h3: "text-xl! font-bold text-text-primary",
  h4: "text-lg! font-semibold text-text-primary",
  h5: "text-base! font-semibold text-text-secondary",
  h6: "text-xs! font-bold uppercase tracking-widest text-text-secondary/80",
};