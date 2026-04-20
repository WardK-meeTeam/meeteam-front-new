import BaseInput from '@/components/shared/BaseInput';
import BaseField from '@/components/shared/BaseField';

type ProfileSectionProps = {
  name: string;
  birth: string;
  gender: string;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeBirth: React.ChangeEventHandler<HTMLInputElement>;
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
      <div className="flex gap-4">
        <BaseField label="이름" htmlFor="name" errorText={nameError}>
          <BaseInput
            id="name"
            type="text"
            value={name}
            placeholder="실명 입력"
            onChange={onChangeName}
          />
        </BaseField>
        <BaseField label="생년월일" htmlFor="birth" errorText={birthError}>
          <BaseInput
            id="birth"
            type="text"
            value={birth}
            placeholder="1998-03-15"
            onChange={onChangeBirth}
          />
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
