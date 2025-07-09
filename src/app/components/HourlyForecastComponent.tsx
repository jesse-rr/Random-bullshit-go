@@ .. @@
     return (
-        <div className='p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg w-3/4 h-1/4 mx-auto mt-8 flex flex-col justify-between'>
+        <div className='p-6 bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-3/4 h-1/4 mx-auto mt-8 flex flex-col justify-between border border-gray-200 dark:border-gray-600'>
             <h3 className='text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center'>Previsão horária</h3>
             <div className='flex overflow-x-auto pb-4 space-x-4 scrollbar-hide items-center flex-grow justify-between'>
                 {forecast.map((hour, index) => (
-                    <div key={index} className='flex-shrink-0 flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-sm text-center min-w-[80px]'>
+                    <div key={index} className='flex-shrink-0 flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center min-w-[80px] border border-gray-200 dark:border-gray-500'>
                         <div className='text-sm text-gray-700 dark:text-gray-300 mb-1'>{new Date(hour.time).getHours()}:00</div>
                         {hour.condition.icon ? (