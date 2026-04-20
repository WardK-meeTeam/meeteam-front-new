'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

import { useProtectedNavigation } from './useProtectedNavigation';

type AuthLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export default function AuthLink({ href, onClick, ...props }: AuthLinkProps) {
  const { maybeOpenLoginModal } = useProtectedNavigation();

  const handleClick: ComponentProps<typeof Link>['onClick'] = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (maybeOpenLoginModal(href)) {
      event.preventDefault();
    }
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
