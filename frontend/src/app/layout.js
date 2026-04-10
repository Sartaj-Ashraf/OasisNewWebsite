import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster, toast } from 'sonner';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Oasis Ascend",
  description: "Oasis is a platform for developers to build and deploy their applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
        <Toaster
          position="top-left"
          closeButton={true}
          closeButtonClassName="text-white"
          richColors={true}
          theme="dark"
          what={"what"}
          toastOptions={{
            className:
              "bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white border border-blue-500/20 shadow-lg shadow-blue-500/10 backdrop-blur-md",
            style: {
              borderRadius: "12px",
            },
          }}

        />
      </body>


    </html>
  );
}




// I am building an admin panel blog system using React (Next.js preferred).
// I need a dynamic blog builder form UI where an admin can create blog content in a flexible, block-based way.
// Core Requirements:
// 1. The blog content should be built using dynamic blocks, not a single textarea.
// 2. Supported block types:
//    * Headings: h1, h2, h3, h4, h5, h6
//    * Paragraph (p)
//    * Image upload
// 3. The admin should be able to:
//    * Add any block type at any time
//    * Reorder blocks (drag-and-drop preferred, not just buttons)
//    * Delete blocks
//    * Edit content of each block independently
//    * Upload and preview images instantly
// 4. Each block should have:
//    * Unique ID
//    * Type
//    * Content (text or image URL/file)
// 5. UI/UX should be:
//    * Clean, modern, and professional (admin dashboard style)
//    * Component-based architecture
//    * Reusable components
// Technical Requirements:
// * Use React (Next.js app router preferred)
// * Functional components with hooks
// * State management using useState (or better if needed)
// * Use a drag-and-drop library (like dnd-kit or react-beautiful-dnd)
// * Image preview using URL.createObjectURL
// * Clean folder structure
// Backend Integration Ready:
// * Structure data in this format:

// ```json
// [
//   { \"id\": \"uuid\", \"type\": \"h1\", \"content\": \"Title\" },
//   { \"id\": \"uuid\", \"type\": \"p\", \"content\": \"Paragraph text\" },
//   { \"id\": \"uuid\", \"type\": \"image\", \"content\": \"image_url\" }
// ]

// ```

// Required Features:
// 1. Create Page:
//    * Empty state
//    * Add blocks dynamically
//    * Save blog (console.log or API-ready)
// 2. Edit Page:
//    * Pre-fill existing blog data
//    * Allow full editing (add/remove/reorder/update)
//    * Maintain existing images
// Output Expectations:
// * Full working code (no pseudo code)
// * Separate components (BlockRenderer, Toolbar, etc.)
// * Clean and readable code
// * Minimal but professional styling (Tailwind or CSS)
// Do NOT:
// * Use a single textarea editor
// * Skip drag-and-drop
// * Give incomplete snippets
// Goal: Build a scalable, production-ready blog editor similar to Notion or Medium editor (simplified).