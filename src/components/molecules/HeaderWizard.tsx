import React from 'react';
import WizardProgressBar from './WizardProgressBar';
import { useWizard } from 'react-use-wizard';

const stepsLabels = [
  'Viaje',
  'Viajeros',
  'Servicios',
  'Resumen'
];

interface HeaderWizardProps {
  completed: boolean[];
}

const HeaderWizard: React.FC<HeaderWizardProps> = ({ completed }) => {
  const { activeStep, goToStep } = useWizard();

  return (
    <>
      <WizardProgressBar
        steps={stepsLabels.map((label, idx) => ({
          label,
          completed: completed[idx],
          current: activeStep === idx,
          onClick: () => {
            if (completed[idx] || activeStep === idx) goToStep(idx);
          },
        }))}
      />
    </>
  );
};

export default HeaderWizard;