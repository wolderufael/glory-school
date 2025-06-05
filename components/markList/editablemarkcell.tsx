import React from 'react';
import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';

interface EditableMarkCellProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
}

export const EditableMarkCell: React.FC<EditableMarkCellProps> = ({
  value,
  onChange,
  max = 100,
  placeholder = "0",
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Math.max(0, Number(e.target.value) || 0), max);
    onChange(newValue);
  };

  return (
    <TableCell>
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
    </TableCell>
  );
};