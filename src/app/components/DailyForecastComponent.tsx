@@ .. @@
     return (
-        <div className="h-auto p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg w-full max-w-md mx-auto ml-80 md:ml-0 md:mt-8">
+        <div className="h-auto p-6 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-md mx-auto ml-80 md:ml-0 md:mt-8 border border-gray-200 dark:border-gray-600">
             <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Previsão próximos 5 dias</h3>
             <table className="h-48 min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                 <thead className="bg-gray-50 dark:bg-gray-600">
@@ .. @@
                         return (
-                            <tr key={index} className="h-20 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-150">
+                            <tr key={index} className="h-20 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white align-middle text-center">
                                     {index === 0 ? 'Today' : dayName}