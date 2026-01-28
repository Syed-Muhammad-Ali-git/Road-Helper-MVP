/* ---------------- IMPORTS ---------------- */
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { SearchProvider } from "./context/searchContext";
import { LayoutProvider } from "./context/layoutContext";
import ClientLayout from "./client-layout";

/* ---------------- METADATA ---------------- */
export const metadata: Metadata = {
  title: "Road Helper | Instant Roadside Assistance",
  description:
    "Road Helper provides instant roadside assistance and vehicle support anywhere. Quick, reliable, and trusted service.",
  keywords: [
    "Roadside Assistance",
    "Car Repair",
    "Tow Service",
    "Emergency Road Help",
    "Vehicle Assistance",
  ],
  authors: [{ name: "Road Helper Team", url: "https://roadhelper.vercel.app" }],
  creator: "Road Helper",
  publisher: "Road Helper",
  robots: "index, follow",
  openGraph: {
    title: "Road Helper | Instant Roadside Assistance",
    description:
      "Road Helper provides instant roadside assistance and vehicle support anywhere. Quick, reliable, and trusted service.",
    url: "https://roadhelper.vercel.app",
    siteName: "Road Helper",
    type: "website",
    images: [
      {
        url: "https://roadhelper.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Road Helper - Instant Roadside Assistance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Road Helper | Instant Roadside Assistance",
    description:
      "Quick, reliable, and trusted roadside assistance and vehicle support anywhere.",
    site: "@RoadHelper",
    creator: "@RoadHelper",
    images: ["https://roadhelper.vercel.app/og-image.png"],
  },
};

/* ---------------- COMPONENT ---------------- */
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <ColorSchemeScript />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <MantineProvider
          forceColorScheme="light"
          theme={{ fontFamily: "satoshi" }}
        >
          <LayoutProvider>
            <SearchProvider>
              <ClientLayout>{children}</ClientLayout>
            </SearchProvider>
          </LayoutProvider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
