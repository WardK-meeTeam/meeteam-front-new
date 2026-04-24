import BaseInput from '@/components/shared/BaseInput';
import BaseField from '@/components/shared/BaseField';
import BirthDateSelect from '@/components/features/auth/BirthDateSelect';

type ProfileSectionProps = {
  name: string;
  birth: string;
  gender: string;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBirth: (value: string) => void;
  onChangeGender: React.ChangeEventHandler<HTMLInputElement>;
  nameError?: string;
  birthError?: string;
};

export default function ProfileSection({
  name,
  birth,
  gender,
  onChangeName,
  onChangeBirth,
  onChangeGender,
  nameError,
  birthError,
}: ProfileSectionProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <BaseField label="이름" htmlFor="name" errorText={nameError}>
          <BaseInput
            id="name"
            type="text"
            value={name}
            placeholder="실명 입력"
            onChange={onChangeName}
            data-cy="signup-name"
          />
        </BaseField>
        <BaseField label="생년월일" errorText={birthError}>
          <BirthDateSelect value={birth} onChange={onChangeBirth} />
        </BaseField>
      </div>
      <div>
        <BaseField label="성별" htmlFor="gender">
          <div className="flex h-13 justify-center rounded-xl bg-surface-soft p-1">
            <div className="flex-1">
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                className="peer hidden"
                checked={gender === 'male'}
                onChange={onChangeGender}
                data-cy="signup-gender-male"
              />
              <label
                htmlFor="male"
                className="flex items-center justify-center rounded-lg font-bold cursor-pointer h-11
                   text-muted-gray
                   peer-checked:border peer-checked:border-border-gray peer-checked:text-brand-500 peer-checked:bg-white peer-checked:shadow-sm"
              >
                남성
              </label>
            </div>
            <div className="flex-1">
              <input
                type="radio"
                id="female"
                value="female"
                name="gender"
                className="peer hidden"
                checked={gender === 'female'}
                onChange={onChangeGender}
                data-cy="signup-gender-female"
              />
              <label
                htmlFor="female"
                className="flex items-center justify-center rounded-lg font-bold cursor-pointer h-11
                   text-muted-gray
                   peer-checked:border peer-checked:border-border-gray peer-checked:text-brand-500 peer-checked:bg-white peer-checked:shadow-sm"
              >
                여성
              </label>
            </div>
          </div>
        </BaseField>
      </div>
    </>
  );
}
