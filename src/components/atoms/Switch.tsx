import React from 'react';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({ label, checked, onChange, disabled, ...props }) => (
  <label className="flex items-center cursor-pointer select-none gap-3">
    <span className="text-white font-medium text-base">{label}</span>
    <div className="relative">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only peer"
        {...props}
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-[#0097A7] rounded-full transition-colors duration-200 peer-focus:ring-2 peer-focus:ring-primary peer-disabled:opacity-50" />
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 peer-checked:translate-x-5" />
    </div>
  </label>
);

export default Switch; 