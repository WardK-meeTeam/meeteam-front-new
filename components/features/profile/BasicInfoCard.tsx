import ProfileCard from '@/components/features/profile/ProfileCard';
import { contactItems, profileInfoItems } from '@/components/features/profile/profileData';

export default function BasicInfoCard() {
  const emailContact = contactItems[0];
  const socialContacts = contactItems.slice(1);
  const EmailIcon = emailContact.icon;

  return (
    <ProfileCard title="기본 정보">
      <dl className="mt-4 space-y-4">
        {profileInfoItems.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4">
            <dt className="text-sm leading-5 font-normal text-text-gray">{item.label}</dt>
            <dd className="text-right text-sm leading-5 font-medium text-text-black">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 space-y-4">
        <a
          href={emailContact.href}
          className="flex items-center gap-3 border-y border-border-soft py-4 text-sm leading-5 font-medium text-text-body transition-colors hover:text-text-black"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-border-softborder-border-soft text-text-gray">
            <EmailIcon className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          </span>
          <span>{emailContact.value}</span>
        </a>

        <div className="space-y-3">
          {socialContacts.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.value}
                href={item.href}
                className="flex items-center gap-3 text-sm leading-5 font-medium text-text-body transition-colors hover:text-text-black"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-border-softborder-border-soft text-text-gray">
                  <Icon className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </span>
                <span>{item.value}</span>
              </a>
            );
          })}
        </div>
      </div>
    </ProfileCard>
  );
}
