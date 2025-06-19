import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-2 w-full">
    {label && <label className="text-base font-semibold text-white mb-1">{label}</label>}
    <textarea
      className="px-5 py-3 border rounded-2xl bg-[#448AFF] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all text-lg placeholder-white text-white resize-none"
      {...props}
    />
  </div>
);

export default Textarea; 