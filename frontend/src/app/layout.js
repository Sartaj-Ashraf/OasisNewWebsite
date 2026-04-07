import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
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
      <body>{children}</body>

      <Toaster
        position="top-left"

        toastOptions={{
          className:
            "bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white border border-blue-500/20 shadow-lg shadow-blue-500/10 backdrop-blur-md",
          style: {
            borderRadius: "12px",
          },
        }}
      />
    </html>
  );
}