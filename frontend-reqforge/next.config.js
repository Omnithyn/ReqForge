const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')()
  : (config: any) => config;

const nextConfig = {
  output: 'standalone' as const,
  transpilePackages: ['antd', '@ant-design/icons', '@antv/g6'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8001/api/:path*',
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
