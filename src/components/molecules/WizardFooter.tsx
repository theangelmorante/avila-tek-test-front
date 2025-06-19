import React from 'react';
import Button from '../atoms/Button';
import { useWizard } from 'react-use-wizard';

interface WizardFooterProps {
  onFinish: () => void;
  isDisabled?: boolean;
}

const WizardFooter: React.FC<WizardFooterProps> = ({ onFinish, isDisabled }) => {
  const { isLastStep, previousStep, isFirstStep, nextStep } = useWizard();

  return (<div className="flex justify-between items-center w-full mt-8 gap-4">
    <Button
      type="button"
      onClick={previousStep}
      disabled={isFirstStep}
      className="flex-1 bg-white/20 text-white font-semibold py-3 rounded-2xl disabled:opacity-40"
    >
      Anterior
    </Button>
    {!isLastStep ? (
      <Button
        type="button"
        onClick={nextStep}
        disabled={isDisabled}
        className="flex-1 bg-primary text-white font-bold py-3 rounded-2xl disabled:opacity-40"
      >
        Siguiente
      </Button>
    ) : (
      <Button
        type="button"
        onClick={onFinish}
        className="flex-1 bg-green-500 text-white font-bold py-3 rounded-2xl"
      >
        Finalizar
      </Button>
    )}
  </div>)
};

export default WizardFooter; 