/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Handle Solana packages properly
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url'),
        zlib: require.resolve('browserify-zlib'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        assert: require.resolve('assert'),
        os: require.resolve('os-browserify/browser'),
        path: require.resolve('path-browserify'),
      };
    }

    // Don't externalize Solana packages - let webpack bundle them
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals = config.externals.filter(
        (external) => 
          typeof external !== 'string' || 
          (!external.includes('@solana') && !external.includes('solana'))
      );
    }
    
    return config;
  },
  transpilePackages: [
    '@solana/web3.js',
    '@solana/spl-token',
    '@privy-io/react-auth'
  ]
};

module.exports = nextConfig; 