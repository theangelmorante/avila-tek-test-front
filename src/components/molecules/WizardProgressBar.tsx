import React from 'react';

interface Step {
  label: string;
  completed: boolean;
  current: boolean;
  onClick: () => void;
}

interface WizardProgressBarProps {
  steps: Step[];
}

const WizardProgressBar: React.FC<WizardProgressBarProps> = ({ steps }) => (
  <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 mb-8 flex-nowrap w-full max-w-xs sm:max-w-sm md:max-w-full mx-auto">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <button
          type="button"
          className={`flex flex-col items-center focus:outline-none transition-colors
            ${step.completed ? 'text-white' : step.current ? 'text-white font-bold' : 'text-white/60'}
            ${step.completed ? 'bg-[#1976D2]' : step.current ? 'bg-[#015c30]' : 'bg-[#03230d]'}
            rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 flex items-center justify-center border-2
            ${step.current ? 'border-white' : 'border-transparent'}
            shadow-md text-[10px] sm:text-[11px] md:text-sm`}
          onClick={step.onClick}
          disabled={step.current}
        >
          <span className="text-[10px] sm:text-[11px] md:text-sm">{idx + 1}</span>
        </button>
        <span className={`text-[8px] sm:text-[9px] md:text-xs text-center w-10 sm:w-12 md:w-16 leading-tight ${step.current ? 'font-bold' : ''}`}>{step.label}</span>
        {idx < steps.length - 1 && (
          <div className="w-2 sm:w-3 md:w-8 h-1 bg-white/40 rounded-full" />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default WizardProgressBar; 