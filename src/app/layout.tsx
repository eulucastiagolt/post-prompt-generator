import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Post Prompt Generator",
  description:
    "Obtenha prompt instantânea para seus posts! O Post Prompt Generator gera prompts para você usar em inteligência artificial e gerar ports que Impulsione seu conteúdo com facilidade!",
  authors: [{ name: "Lucas Tiago", url: "https://github.com/eulukasthyago" }],
  openGraph: {
    title: "Post Prompt Generator",
    description:
      "Obtenha prompt instantânea para seus posts! O Post Prompt Generator gera prompts para você usar em inteligência artificial e gerar ports que Impulsione seu conteúdo com facilidade!",
    images: ["/thumbnail.png"],
    publishedTime: "2023-09-02",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
