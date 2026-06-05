import { Footer } from "@/shared/Footer";
import LenisProvider from "@/utils/LenisProvider";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function ClientLayout({ children }) {
  return (
    <div className={`${inter.variable} ${poppins.variable}`}>
      <LenisProvider />
      <main className="font-sans">
        {children}
      </main>
      <Footer />
    </div>
  );
}