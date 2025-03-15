import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PlinkoFormType } from '@/shared/types/mini-game';
import Button from '@/shared/ui/button';
import { cn } from '@/shared/utils/cn';

interface RiskBox {
  register: UseFormRegister<PlinkoFormType>;
  setValue: UseFormSetValue<PlinkoFormType>;
  selectedRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  setSelectedRisk: (risk: 'LOW' | 'MEDIUM' | 'HIGH') => void;
}

const RiskBox = ({
  register,
  setValue,
  selectedRisk,
  setSelectedRisk,
}: RiskBox) => {
  register('risk', { required: '위험도 선택은 필수입니다.' });

  const handleRiskSelect = (risk: 'LOW' | 'MEDIUM' | 'HIGH') => {
    setSelectedRisk(risk);
    setValue('risk', risk, { shouldValidate: true });
  };

  const risks: { label: string; value: 'LOW' | 'MEDIUM' | 'HIGH' }[] = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
  ];

  return (
    <div className={cn('flex', 'w-full', 'flex-col', 'gap-[1.5rem]')}>
      <h2 className={cn('text-body2e', 'text-white')}>리스크</h2>
      <div className={cn('flex', 'flex-row', 'w-full', 'gap-[0.75rem]')}>
        {risks.map((risk) => (
          <Button
            key={risk.value}
            onClick={() => handleRiskSelect(risk.value)}
            bg={selectedRisk !== risk.value ? 'bg-black-800' : undefined}
            border={selectedRisk === risk.value ? undefined : 'border-white'}
          >
            {risk.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RiskBox;
