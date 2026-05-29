import type { Metadata } from "next";
import { Figtree, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

// FONTS
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ['400', '600'],
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ['400'],
});

// METADATA
export const metadata: Metadata = {
  title: "harema",
  description: "Welcome to my portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${figtree.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body className="min-h-full text-black text-body-base text-justify relative">
        {/* HEADER */}
        <Header />
        {/* MAIN CONTENT */}
        <main className="pt-[120px] pb-[62px] xl:pt-[150px]">
          {children}
        </main>
        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
