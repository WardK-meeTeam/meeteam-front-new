import BaseInput from '@/components/shared/BaseInput';
import BaseField from '@/components/shared/BaseField';

export default function ProfileSection() {
  return (
    <>
      <div className="flex gap-4">
        <BaseField label="이름" htmlFor="name">
          <BaseInput id="name" type="text" placeholder="실명 입력" />
        </BaseField>
        <BaseField label="생년월일" htmlFor="birth">
          <BaseInput id="birth" type="text" placeholder="연도 - 월 - 일" />
        </BaseField>
      </div>
      <div>
        <BaseField label="성별" htmlFor="gender">
          <div className="flex bg-[#f8fafc] p-1 rounded-xl h-13 justify-center">
            <div className="flex-1">
              <input
                type="radio"
                id="male"
                value="male"
                name="gender"
                className="peer hidden"
                defaultChecked
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
      </div>{' '}
    </>
  );
}
