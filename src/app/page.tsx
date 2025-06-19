'use client';
import React, { useState } from 'react';
import WizardStepTemplate from '../components/templates/WizardStepTemplate';
import TravelInfoForm, { TravelInfoFormData } from '../components/organisms/TravelInfoForm';
import TravelersForm, { TravelersFormData } from '../components/organisms/TravelersForm';
import { FlightsDataProvider } from '../components/organisms/FlightsDataContext';
import { Wizard } from 'react-use-wizard';
import HeaderWizard from '@/components/molecules/HeaderWizard';



function WizardSteps() {
  const [step1Data, setStep1Data] = useState<TravelInfoFormData | null>(null);
  const [step2Data, setStep2Data] = useState<TravelersFormData | null>(null);
  const [completed, setCompleted] = useState([false, false]);

  const handleStep1 = (data: TravelInfoFormData) => {
    setStep1Data(data);
    setCompleted([true, completed[1]]);
    console.log(step1Data)
    // goToStep(1);
  };
  const handleStep2 = (data: TravelersFormData) => {
    setStep2Data(data);
    setCompleted([true, true]);
    console.log(step2Data)
    // Aquí podrías mostrar un resumen o finalizar
  };

  return (
    <WizardStepTemplate
      title="Información del Viaje"
      description="Completa los datos para buscar tu vuelo ideal."
    >
      <Wizard startIndex={0} header={<HeaderWizard completed={completed} />}>
        <TravelInfoForm onSubmit={handleStep1} initialValues={step1Data} />
        <TravelersForm onSubmit={handleStep2} initialValues={step2Data} />
      </Wizard>
      {/* {activeStep === 1 && completed[1] && (
        <div className="text-white text-center mt-8">
          <h2 className="text-xl font-bold mb-2">¡Datos enviados correctamente!</h2>
          <pre className="bg-white/10 rounded p-4 text-left overflow-x-auto text-xs md:text-sm text-white">
            {JSON.stringify({ ...step1Data, ...step2Data }, null, 2)}
          </pre>
        </div>
      )} */}
    </WizardStepTemplate>
  );
}

export default function Home() {
  return (
    <FlightsDataProvider>
      <WizardSteps />
    </FlightsDataProvider>
  );
}
