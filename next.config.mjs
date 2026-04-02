/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["sanity", "styled-components"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
}

export default nextConfig
