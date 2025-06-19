import React from 'react';
import Button from '../atoms/Button';
import { useWizard } from 'react-use-wizard';

interface WizardFooterProps {
  onFinish: () => void;
  isStepValid?: boolean[];
  bookingConfirmed?: boolean;
  onNewBooking?: () => void;
}

const WizardFooter: React.FC<WizardFooterProps> = ({ onFinish, isStepValid, bookingConfirmed, onNewBooking }) => {
  const { isLastStep, previousStep, isFirstStep, nextStep, activeStep, goToStep } = useWizard();
  const isDisabled = !isStepValid?.[activeStep];

  if (bookingConfirmed) {
    return (
      <div className="flex justify-center w-full mt-8">
        <Button
          type="button"
          onClick={() => {
            goToStep(0);
            onNewBooking && onNewBooking();
          }}
          className="bg-primary text-white font-bold py-3 px-8 rounded-2xl shadow-md hover:bg-primary/80 transition-all"
        >
          Reservar otro viaje
        </Button>
      </div>
    );
  }

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