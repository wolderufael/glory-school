import React from "react";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";

interface AssessmentCellProps {
  value: number | string | null | undefined;
  onChange?: (value: number | string | null) => void;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  isStatus?: boolean;
  readOnly?: boolean;
}

export const AssessmentCell: React.FC<AssessmentCellProps> = ({
  value,
  onChange,
  max = 100,
  placeholder = "0",
  disabled = false,
  label,
  isStatus = false,
  readOnly = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      if (isStatus) {
        const val = e.target.value.trim();
        // Allow empty string (null), 'N/A', or any custom status
        onChange(val === "" ? null : val);
      } else {
        const newValue = Math.min(
          Math.max(0, Number(e.target.value) || 0),
          max
        );
        onChange(newValue);
      }
    }
  };

  return (
    <TableCell>
      <div className="space-y-1">
        {label && <div className="text-xs text-gray-500">{label}</div>}
        {isStatus ? (
          <div className="w-20 text-center min-w-[100px] px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
            <span
              className={`text-sm font-medium ${
                value === "NA"
                  ? "text-gray-600"
                  : value === "NG"
                  ? "text-red-600"
                  : "text-gray-800"
              }`}
            >
              {value || "-"}
            </span>
          </div>
        ) : (
          <Input
            type="number"
            value={value || ""}
            onChange={handleChange}
            placeholder={placeholder}
            min="0"
            max={max}
            disabled={disabled}
            className="w-20 text-center"
          />
        )}
      </div>
    </TableCell>
  );
};
