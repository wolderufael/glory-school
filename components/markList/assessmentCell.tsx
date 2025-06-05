import React from 'react';
import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';

interface AssessmentCellProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

export const AssessmentCell: React.FC<AssessmentCellProps> = ({
  value,
  onChange,
  max = 100,
  placeholder = "0",
  disabled = false,
  label
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Math.max(0, Number(e.target.value) || 0), max);
    onChange(newValue);
  };

  return (
    <TableCell>
      <div className="space-y-1">
        {label && <div className="text-xs text-gray-500">{label}</div>}
        <Input
          type="number"
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          min="0"
          max={max}
          disabled={disabled}
          className="w-20 text-center"
        />
      </div>
    </TableCell>
  );
};
