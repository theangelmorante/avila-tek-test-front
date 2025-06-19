import React from 'react';

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className = '' }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-white ${className}`}>
    {children}
  </label>
);

export default Label; 