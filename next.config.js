/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Handle Solana package externals
    config.externals = config.externals || {};
    config.externals['@solana/web3.js'] = 'commonjs @solana/web3.js';
    config.externals['@solana/spl-token'] = 'commonjs @solana/spl-token';
    
    return config;
  }
};

module.exports = nextConfig; 