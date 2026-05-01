import { Github } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

export default function GithubLoginIcon(props: ComponentPropsWithoutRef<typeof Github>) {
  return <Github aria-hidden="true" strokeWidth={2} {...props} />;
}
