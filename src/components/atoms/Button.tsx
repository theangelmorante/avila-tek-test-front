import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const base = 'w-full py-3 rounded-full font-semibold focus:outline-none transition-colors text-lg shadow-md cursor-pointer';
  const variants = {
    primary: 'bg-[#0097A7] text-white hover:bg-[#00BCD4]',
    secondary: 'bg-[#B2EBF2] hover:bg-secondary-dark',
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export default Button; 