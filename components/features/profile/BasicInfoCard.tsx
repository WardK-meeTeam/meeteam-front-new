'use client';

import { useState } from 'react';
import BaseDropdown from '@/components/shared/BaseDropdown';
import BaseInput from '@/components/shared/BaseInput';
import ProfileCard from '@/components/features/profile/ProfileCard';
import { contactItems, profileInfoItems } from '@/components/features/profile/profileData';

interface EditableProfileFields {
  age: string;
  gender: string;
  fieldCategory: string;
  fieldRole: string;
  projectCount: string;
  github: string;
  blog: string;
}

interface BasicInfoCardProps {
  editable?: boolean;
  formData?: EditableProfileFields;
  onFieldChange?: (field: keyof EditableProfileFields, value: string) => void;
}

const FIELD_CATEGORY_OPTIONS = ['디자인', '개발', '기획'];
const FIELD_ROLE_OPTIONS = ['UI/UX디자인', '그래픽디자인', '웹프론트엔드'];

export default function BasicInfoCard({
  editable = false,
  formData,
  onFieldChange,
}: BasicInfoCardProps) {
  const emailContact = contactItems[0];
  const socialContacts = contactItems.slice(1);
  const EmailIcon = emailContact.icon;
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  if (!editable || !formData || !onFieldChange) {
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
            className="flex items-center gap-3 border-y border-border-soft py-4 text-sm leading-5 font-medium text-project-status-closed transition-colors hover:text-text-black"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-border-soft text-text-gray">
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
                  className="flex items-center gap-3 text-sm leading-5 font-medium text-project-status-closed transition-colors hover:text-text-black"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-border-soft text-text-gray">
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

  return (
    <ProfileCard className="min-h-[488px]">
      <h2 className="text-lg leading-7 font-bold text-text-black">기본 정보 수정</h2>

      <div className="mt-4 space-y-4">
        <dl className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <dt className="text-sm leading-5 font-normal text-text-gray">나이</dt>
            <dd className="text-right text-sm leading-5 font-medium text-text-black">
              {formData.age}
            </dd>
          </div>

          <div className="flex items-start justify-between gap-4">
            <dt className="text-sm leading-5 font-normal text-text-gray">성별</dt>
            <dd className="text-right text-sm leading-5 font-medium text-text-black">
              {formData.gender}
            </dd>
          </div>

          <div className="space-y-2">
            <dt className="text-sm leading-5 font-normal text-text-gray">직군</dt>
            <dd className="space-y-2">
              <BaseDropdown
                value={formData.fieldCategory}
                placeholder="직군 대분류"
                open={isCategoryOpen}
                items={FIELD_CATEGORY_OPTIONS}
                onToggle={() => setIsCategoryOpen((current) => !current)}
                onSelect={(value) => {
                  onFieldChange('fieldCategory', value);
                  setIsCategoryOpen(false);
                }}
                containerClassName="w-full"
                buttonClassName="items-center justify-between px-3 py-2.5"
                textClassName="text-sm leading-5 font-normal text-text-body"
              />

              <BaseDropdown
                value={formData.fieldRole}
                placeholder="직군 세부 분야"
                open={isRoleOpen}
                items={FIELD_ROLE_OPTIONS}
                onToggle={() => setIsRoleOpen((current) => !current)}
                onSelect={(value) => {
                  onFieldChange('fieldRole', value);
                  setIsRoleOpen(false);
                }}
                containerClassName="w-full"
                buttonClassName="items-center justify-between px-3 py-2.5"
                textClassName="text-sm leading-5 font-normal text-text-body"
              />
            </dd>
          </div>

          <div className="space-y-2">
            <dt className="text-sm leading-5 font-normal text-text-gray">프로젝트 횟수</dt>
            <dd className="rounded-lg border border-border-gray px-3 py-2.5 text-sm leading-5 font-medium text-text-body">
              {formData.projectCount}
            </dd>
          </div>
        </dl>

        <div className="space-y-4 border-t border-border-soft pt-4">
          <div className="flex items-center gap-3 text-sm leading-5 font-medium text-project-status-closed">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-border-soft text-text-gray">
              <EmailIcon className="h-4 w-4" aria-hidden strokeWidth={1.8} />
            </span>
            <span>{emailContact.value}</span>
          </div>

          {socialContacts.map((item, index) => {
            const Icon = item.icon;
            const field = index === 0 ? 'github' : 'blog';

            return (
              <div key={item.value} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-border-soft text-text-gray">
                  <Icon className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </span>

                <BaseInput
                  inputSize="S"
                  value={formData[field]}
                  onChange={(event) => onFieldChange(field, event.target.value)}
                  className="rounded-lg text-sm leading-5 font-medium text-text-body"
                />
              </div>
            );
          })}
        </div>
      </div>
    </ProfileCard>
  );
}
