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
  title: "Road Helper",
  description: "Instant Roadside Assistance",
};

/* ---------------- COMPONENT ---------------- */
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body cz-shortcut-listen="true">
        <MantineProvider>
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
