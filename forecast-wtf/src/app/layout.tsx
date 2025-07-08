import { ReactNode } from "react";
import { ThemeProvider } from "./hooks/themeContext";
import './globals.css'

const Layout = ({ children }: {children: ReactNode}) => {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
