import React from 'react';
import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';

interface AssessmentCellProps {
  value: number | string | null | undefined;
  onChange: (value: number | string | null) => void;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  isStatus?: boolean;
}

export const AssessmentCell: React.FC<AssessmentCellProps> = ({
  value,
  onChange,
  max = 100,
  placeholder = "0",
  disabled = false,
  label,
  isStatus = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isStatus) {
      const val = e.target.value.trim();
      // Allow empty string (null), 'N/A', or any custom status
      onChange(val === '' ? null : val);
    } else {
      const newValue = Math.min(Math.max(0, Number(e.target.value) || 0), max);
      onChange(newValue);
    }
  };

  return (
    <TableCell>
      <div className="space-y-1">
        {label && <div className="text-xs text-gray-500">{label}</div>}
        <Input
          type={isStatus ? "text" : "number"}
          value={isStatus 
            ? (value === null || value === undefined ? '' : String(value))
            : (value || '')}
          onChange={handleChange}
          placeholder={placeholder}
          min={isStatus ? undefined : "0"}
          max={isStatus ? undefined : max}
          disabled={disabled}
          className={`w-20 text-center ${isStatus ? 'min-w-[100px]' : ''}`}
        />
      </div>
    </TableCell>
  );
};