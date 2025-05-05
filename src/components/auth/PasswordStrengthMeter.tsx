import React from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password, className }) => {
  const calculateStrength = (pwd: string): number => {
    let score = 0;
    if (pwd.length >= 8) {
      score += 1;
      if (pwd.length >= 12) score += 1;
      if (/[a-z]/.test(pwd)) score += 1;
      if (/[A-Z]/.test(pwd)) score += 1;
      if (/\d/.test(pwd)) score += 1;
      if (/[\W_]/.test(pwd)) score += 1;
    }
    return score;
  };

  const score = calculateStrength(password);
  const strengthText = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][Math.min(score, 4)];

  return (
    <>
      <div className={cn('bg-gray-300 rounded-full overflow-hidden', className)}>
        <div
          className={cn('h-1 bg-gray-400 transition-all rounded-full', {
            'bg-green-500': score > 3,
            'bg-orange-400': score === 3,
            'bg-red-500': score < 3,
          })}
          style={{ width: `${Math.ceil((score / 5) * 100) || 5}%` }}
        />
      </div>
      <div className="flex text-[12px] mt-1 leading-tight">
        <div className="text-gray-500">Password minimal 8 karakter</div>
        <div
          className={cn('font-semibold text-gray-500 ml-auto text-[11px]', {
            'text-green-500': score > 3,
            'text-orange-400': score === 3,
            'text-red-500': score < 3,
          })}
        >
          {strengthText}
        </div>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;
