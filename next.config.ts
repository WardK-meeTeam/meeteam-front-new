import type { NextConfig } from 'next';
import { execSync } from 'node:child_process';

const LOCAL_API_BASE_URL = 'http://localhost:8080';
const PRODUCTION_API_BASE_URL = 'https://api.meeteam.alom-sejong.com';
const TEST_API_BASE_URL = 'https://test.meeteam.alom-sejong.com';

function getCurrentGitBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  } catch {
    return undefined;
  }
}

function resolveApiBaseUrl() {
  const deploymentTarget =
    process.env.NEXT_PUBLIC_DEPLOY_ENV ??
    process.env.VERCEL_GIT_COMMIT_REF ??
    process.env.GITHUB_REF_NAME ??
    getCurrentGitBranch();

  if (deploymentTarget === 'test') {
    return TEST_API_BASE_URL;
  }

  if (deploymentTarget === 'main') {
    return PRODUCTION_API_BASE_URL;
  }

  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (process.env.NODE_ENV === 'production') {
    return PRODUCTION_API_BASE_URL;
  }

  return LOCAL_API_BASE_URL;
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: resolveApiBaseUrl(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3845',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3845',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'api.meeteam.alom-sejong.com',
      },
      {
        protocol: 'https',
        hostname: 'test.meeteam.alom-sejong.com',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
