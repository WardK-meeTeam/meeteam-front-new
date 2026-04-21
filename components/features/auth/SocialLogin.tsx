'use client';

import Github from '@/assets/GithubLogin.svg';
import Google from '@/assets/Google.svg';
import { buildOAuthAuthorizationUrl, type OAuthProvider } from './oauthApi';

export default function SocialLogin() {
  const handleOAuthLogin = (provider: OAuthProvider) => {
    window.location.assign(buildOAuthAuthorizationUrl(provider));
  };

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="flex items-center gap-4">
        <hr className="h-px border-[#F1F5F9] grow" />
        <span className="font-normal text-[12px] leading-4 text-muted-gray">간편 로그인</span>
        <hr className="h-px border-[#F1F5F9] grow" />
      </div>

      <div className="flex w-full gap-3 items-start">
        <button
          type="button"
          onClick={() => handleOAuthLogin('google')}
          data-cy="oauth-login-google"
          className="flex flex-1 gap-2 py-3 items-center justify-center rounded-xl border border-slate-200 cursor-pointer"
        >
          <Google aria-hidden className="h-5 w-5" />
          <span className="text-text-body font-bold text-3.5">Google</span>
        </button>
        <button
          type="button"
          onClick={() => handleOAuthLogin('github')}
          data-cy="oauth-login-github"
          className="flex flex-1 gap-2 py-3 items-center justify-center bg-[#24292f] rounded-xl cursor-pointer"
        >
          <Github aria-hidden className="h-5 w-5 text-white" />
          <span className="text-white font-bold text-3.5">GitHub</span>
        </button>
      </div>
    </section>
  );
}
