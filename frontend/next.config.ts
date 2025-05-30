import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        // Redireciona todas as rotas que não sejam _next, favicon.ico, register, login ou wait para o backend
        source: '/:path((?!_next|favicon.ico|register|login|wait).*)',
        destination: 'http://localhost:8080/:path*',
      },
    ];
  },
};

export default nextConfig;
