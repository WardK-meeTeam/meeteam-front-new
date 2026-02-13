import BaseField from '@/components/shared/BaseField';
import BaseInput from '@/components/shared/BaseInput';
import { Plus } from 'lucide-react';

export default function TechStackSection() {
  return (
    <div>
      <BaseField label="기술 스택" htmlFor="tech" required={false}>
        <BaseInput
          id="tech"
          type="search"
          placeholder="기술 스택 검색"
          rightIcon={
            <Plus width={24} height={24} color="#94a3b8" className="p-1 rounded-lg bg-[#f8fafc]" />
          }
        />
      </BaseField>
    </div>
  );
}
