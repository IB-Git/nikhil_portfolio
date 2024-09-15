/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: "/nikhil_portfolio",
  // output: "export", // <=== enables static exports
  trailingSlash: true, // Important for GitHub Pages to generate static routes correctly
  exportTrailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig