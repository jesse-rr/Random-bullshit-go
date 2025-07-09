@@ .. @@
     return (
         <div
-            className='grid grid-cols-2 gap-4 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg w-3/4 mx-auto mt-8'
+            className='grid grid-cols-2 gap-4 p-6 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-3/4 mx-auto mt-8 border border-gray-200 dark:border-gray-600'
         >
             {details.map((item, index) => (
                 <div key={index} className="flex justify-center">
-                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-sm w-48 justify-center"> {/* Adicionado justify-center aqui */}
+                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-48 justify-center border border-gray-200 dark:border-gray-500">
                         <FontAwesomeIcon icon={item.icon} className="text-blue-500 dark:text-blue-400 text-2xl" />
                         <div className="flex flex-col">