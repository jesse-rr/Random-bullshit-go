@@ .. @@
   useEffect(() => {
     const savedTheme = localStorage.getItem('theme') as Theme | null;
-    if (savedTheme) {
+    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
+    
+    if (savedTheme) {
       setTheme(savedTheme);
+    } else if (prefersDark) {
+      setTheme('dark');
     }
   }, []);