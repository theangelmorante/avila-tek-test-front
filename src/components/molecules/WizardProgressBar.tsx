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
  <div className="flex items-center justify-center gap-4 mb-8">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        <button
          type="button"
          className={`flex flex-col items-center focus:outline-none transition-colors
            ${step.completed ? 'text-white' : step.current ? 'text-white font-bold' : 'text-white/60'}
            ${step.completed ? 'bg-[#1976D2]' : step.current ? 'bg-[#448AFF]' : 'bg-[#303F9F]'}
            rounded-full w-10 h-10 flex items-center justify-center border-2
            ${step.current ? 'border-white' : 'border-transparent'}
            shadow-md`}
          onClick={step.onClick}
          disabled={step.current}
        >
          <span className="text-lg">{idx + 1}</span>
        </button>
        <span className={`mt-2 text-xs text-center w-20 ${step.current ? 'font-bold' : ''}`}>{step.label}</span>
        {idx < steps.length - 1 && (
          <div className="w-8 h-1 bg-white/40 rounded-full mx-2" />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default WizardProgressBar; 