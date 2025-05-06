/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true, // ✅ REQUIRED for static export
  },
  output: 'export',
  distDir: 'dist', // ✅ Optional: will output to 'dist' instead of 'out'
}

module.exports = nextConfig;
