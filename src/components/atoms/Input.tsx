import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-2">
    {label && <label className="text-base font-semibold text-red mb-1">{label}</label>}
    <input
      className="px-5 py-3 border rounded-2xl bg-[#448AFF] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg placeholder-white text-white"
      {...props}
    />
  </div>
);

export default Input; 