const Layout = ({ children }: { children: ReactNode }) => {
   return (
     <html lang="pt-BR" suppressHydrationWarning>
      <body 
        style={{ 
          backgroundImage: `url('/image.webp')`,
          backgroundAttachment: 'fixed'
        }} 
        className="bg-cover bg-center min-h-screen"
      >
        <ThemeProvider>
          <div className="min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
   )
}