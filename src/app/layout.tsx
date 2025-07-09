
'use client'

import { ReactNode } from "react";
import './globals.css'
import { Providers } from "./providers";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pt-BR" className="light" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default Layout;
