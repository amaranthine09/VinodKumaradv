import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import data from "./data/siteData.json";
import { Analytics } from '@vercel/analytics/next';

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: data.ui.meta.title,
  description: data.ui.meta.description,
  keywords: "Advocate Vinod Thakur, HP High Court, Shimla lawyer, Himachal Pradesh advocate, legal services",
  openGraph: {
    title: data.ui.meta.title,
    description: data.ui.meta.description,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${jakartaSans.variable} ${inter.variable} antialiased scroll-smooth`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="min-h-screen font-[family-name:var(--font-inter)]">
        <ThemeProvider>
          <div className="bg-mesh" aria-hidden="true" />
          <div className="relative z-[1]">{children}</div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
