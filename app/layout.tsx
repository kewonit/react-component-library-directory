import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://react-libraries.directory"),
  title: {
    default: "React Component Libraries Directory",
    template: "%s | React Libraries",
  },
  description:
    "Discover and compare the best React component libraries. From UI frameworks to animation libraries, find the perfect tools for your next project.",
  keywords: [
    "React",
    "Component Libraries",
    "UI Framework",
    "React Components",
    "Tailwind CSS",
    "shadcn/ui",
    "Animation Libraries",
    "Headless UI",
  ],
  authors: [{ name: "React Libraries Directory" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://react-libraries.directory",
    title: "React Component Libraries Directory",
    description:
      "Discover and compare the best React component libraries for your next project.",
    siteName: "React Libraries Directory",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Component Libraries Directory",
    description:
      "Discover and compare the best React component libraries for your next project.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen flex flex-col bg-white relative"}>
        <div className="fixed inset-y-0 left-0 w-px text-gray-200 border-x border-x-current [background-size:10px_10px] bg-fixed [background-image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"></div>
        <div className="fixed inset-y-0 right-0 w-px text-gray-200 border-x border-x-current [background-size:10px_10px] bg-fixed [background-image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
