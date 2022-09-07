/** @type {import('tailwindcss').Config} */

module.exports = {  
  content: [   
        "./pages/**/*.{js,ts,jsx,tsx}",   
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.js",  
         ],
         plugins: [
               require('flowbite/plugin')
            ],
            theme: {},
}

/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
//  module.exports = {
//        content: [
//          "./node_modules/flowbite-react/**/*.js",
//          "./pages/**/*.{ts,tsx}",
//          "./public/**/*.html",
//        ],
//        plugins: [
//          require("flowbite/plugin")
//        ],
//        theme: {},
//      };
