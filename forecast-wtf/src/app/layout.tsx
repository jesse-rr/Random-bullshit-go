// src/app/layout.tsx
'use client'

import { ReactNode } from "react";
import { ThemeProvider } from "./hooks/themeContext";
import './globals.css'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body style={{ backgroundImage: `url('/image.webp')` }} className="bg-cover bg-center">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
