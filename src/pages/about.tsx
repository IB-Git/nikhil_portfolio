function About() {
  return (
    <div className="flex flex-col items-start justify-start py-8 lg:py-16">
      <div className="max-w-xl text-left">
        {/* Main Text: Change text-gray-950 to text-black dark:text-gray-100 */}
        <p className="text-xl lg:text-2xl font-satoshi-light leading-relaxed text-black dark:text-gray-100 mb-8">
          Nikhil Nangare is a photographer based in Mumbai.
          Born and raised in Satara, he grew up surrounded by trees and mountains.
          He is fascinated by simple and mundane things around him
          and his father&apos;s collection of old film stocks.
        </p>
        
        <div className="mt-8 flex flex-col md:flex-row md:justify-between w-full">
          
          {/* Email Link: Change text-gray-750 to text-gray-700 dark:text-gray-400 */}
          <p className="text-lg lg:text-xl font-satoshi-light leading-relaxed text-gray-700 dark:text-gray-400">
            <a 
              href="mailto:nikhilnangarework@gmail.com" 
              className="hover:text-gray-700 dark:hover:text-gray-300 transition duration-200"
            >
              nikhilnangarework@gmail.com
            </a>
          </p>

          {/* Phone Link: Change text-gray-750 to text-gray-700 dark:text-gray-400 */}
          <p className="text-lg lg:text-xl font-satoshi-light leading-relaxed text-gray-700 dark:text-gray-400 md:mb-0 mb-2">
            <a 
              href="tel:+918888291886" 
              className="hover:text-gray-700 dark:hover:text-gray-300 transition duration-200"
            >
              +91 8888291886
            </a>
          </p>
          
        </div>
      </div>
    </div>
  )
}
  
export default About
