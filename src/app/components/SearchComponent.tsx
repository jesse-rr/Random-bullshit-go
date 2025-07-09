@@ .. @@
             <form onSubmit={handleFormSubmit} className='flex w-full bg-white dark:bg-gray-700 rounded-full shadow-lg overflow-hidden'>
                 <input
                     type='text'
-                    className='flex-grow px-6 py-3 text-lg outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300'
+                    className='flex-grow px-6 py-3 text-lg outline-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 transition-colors duration-200'
                     placeholder='Digita sua cidade aqui'
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
@@ -32,7 +32,7 @@
                 <button
                     type='submit'
-                    className='bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-r-full transition-colors duration-200 flex items-center justify-center'
+                    className='bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-4 rounded-r-full transition-colors duration-200 flex items-center justify-center'
                     disabled={loading}
                 >
                     <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
@@ .. @@
                             <button
                                 key={index}
                                 onClick={() => onSelectHistory(histCity)}
-                                className="px-6 py-3 text-base bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 shadow-md mb-2"
+                                className="px-6 py-3 text-base bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-200 shadow-md hover:shadow-lg mb-2"
                                 disabled={loading}
                             >
                                 {histCity}
@@ .. @@
             <button
                 onClick={onDetectLocation}
-                className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-colors duration-200 flex items-center space-x-2"
+                className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                 disabled={loading}
             >
                 <FontAwesomeIcon icon={faLocationDot} />