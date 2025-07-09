@@ .. @@
     return (
     )
-        <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg w-3/4 h-1-4">
+        <div className="flex justify-between items-center p-6 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-3/4 h-1-4 border border-gray-200 dark:border-gray-600">
             <div className="flex flex-col items-center flex-grow">
                 <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{location.name}, {location.country}</h1>
                 <span className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">{current.temp_c}°C</span>