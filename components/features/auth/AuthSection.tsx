import BaseInput from '@/components/shared/BaseInput';
import BaseField from '@/components/shared/BaseField';

type AuthSectionProps = {
  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  onChangePasswordConfirm: React.ChangeEventHandler<HTMLInputElement>;
  isPasswordMatched: boolean;
};

export default function AuthSection({
  onChangeEmail,
  onChangePassword,
  onChangePasswordConfirm,
  isPasswordMatched,
}: AuthSectionProps) {
  return (
    <>
      <BaseField label="이메일" htmlFor="email">
        <div className="flex gap-2">
          <BaseInput
            id="email"
            type="email"
            placeholder="example@email.com"
            onChange={onChangeEmail}
          />
          <button
            type="button"
            className="flex items-center justify-center rounded-xl cursor-pointer text-brand-500 text-sm pl-4 pr-4 bg-[#eef2ff] leading-5 whitespace-nowrap"
          >
            <span className="font-bold">중복 확인</span>
          </button>
        </div>
      </BaseField>

      <div className="flex gap-4">
        <BaseField label="비밀번호" htmlFor="password">
          <BaseInput
            id="password"
            type="password"
            placeholder="8자 이상 입력"
            onChange={onChangePassword}
          />
        </BaseField>
        <BaseField label="비밀번호 확인" htmlFor="passwordConfirm">
          <BaseInput
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호 재입력"
            onChange={onChangePasswordConfirm}
          />
          {!isPasswordMatched && (
            <p className="text-red-500 text-xs">비밀번호가 일치하지 않습니다.</p>
          )}
        </BaseField>
      </div>
    </>
  );
}
