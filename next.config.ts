import type { NextConfig } from 'next';
import { execFileSync } from 'node:child_process';

const PRODUCTION_DEPLOYMENT_TARGET = 'main';

const API_BASE_URL = {
  local: 'http://localhost:8080',
  production: 'https://api.meeteam.alom-sejong.com',
  test: 'https://test.meeteam.alom-sejong.com',
} as const;

const DEPLOYMENT_TARGET_ENV_KEYS = [
  'NEXT_PUBLIC_DEPLOY_ENV',
  'VERCEL_GIT_COMMIT_REF',
  'GITHUB_REF_NAME',
] as const;

function getEnvValue(key: (typeof DEPLOYMENT_TARGET_ENV_KEYS)[number]) {
  const value = process.env[key]?.trim();

  return value || undefined;
}

function getCurrentGitBranch() {
  try {
    const branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();

    return branch || undefined;
  } catch {
    return undefined;
  }
}

function getDeploymentTarget() {
  for (const key of DEPLOYMENT_TARGET_ENV_KEYS) {
    const value = getEnvValue(key);

    if (value) {
      return value;
    }
  }

  return getCurrentGitBranch();
}

function resolveApiBaseUrl() {
  const deploymentTarget = getDeploymentTarget();

  if (deploymentTarget) {
    return deploymentTarget === PRODUCTION_DEPLOYMENT_TARGET
      ? API_BASE_URL.production
      : API_BASE_URL.test;
  }

  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (process.env.NODE_ENV === 'production') {
    return API_BASE_URL.production;
  }

  return API_BASE_URL.local;
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
