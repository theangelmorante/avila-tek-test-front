'use client';
import React, { useState } from 'react';
import WizardStepTemplate from '../components/templates/WizardStepTemplate';
import TravelInfoForm, { TravelInfoFormData } from '../components/organisms/TravelInfoForm';
import TravelersForm, { TravelersFormData } from '../components/organisms/TravelersForm';
import { FlightsDataProvider } from '../components/organisms/FlightsDataContext';
import { Wizard } from 'react-use-wizard';
import HeaderWizard from '@/components/molecules/HeaderWizard';
import AdditionalServicesForm, { AdditionalServicesFormData } from '../components/organisms/AdditionalServicesForm';
import BookingSummary from '../components/organisms/BookingSummary';
import WizardFooter from '../components/molecules/WizardFooter';

function WizardSteps() {
  const [step1Data, setStep1Data] = useState<TravelInfoFormData | null>(null);
  const [step2Data, setStep2Data] = useState<TravelersFormData | null>(null);
  const [step3Data, setStep3Data] = useState<AdditionalServicesFormData | null>(null);
  const [completed, setCompleted] = useState([false, false, false, false]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleStep1 = (data: TravelInfoFormData) => {
    setStep1Data(data);
    setCompleted([true, completed[1], completed[2], completed[3]]);
    // goToStep(1);
  };
  const handleStep2 = (data: TravelersFormData) => {
    setStep2Data(data);
    setCompleted([true, true, completed[2], completed[3]]);
    // Aquí podrías mostrar un resumen o finalizar
  };
  const handleStep3 = (data: AdditionalServicesFormData) => {
    setStep3Data(data);
    setCompleted([true, true, true, completed[3]]);
    // Aquí podrías mostrar un resumen o finalizar
  };
  // const handleStep4 = () => {
  //   setCompleted([true, true, true, true]);
  // };

  return (
    <WizardStepTemplate
      title="Información del Viaje"
      description="Completa los datos para buscar tu vuelo ideal."
    >
      <div className="min-h-[400px] md:min-h-[500px] max-h-[90vh] overflow-y-auto flex flex-col justify-between">
        <Wizard
          startIndex={0}
          header={<HeaderWizard completed={completed} />}
          footer={
            <WizardFooter
              onFinish={() => setBookingConfirmed(true)}
              isDisabled={false}
            />
          }
        >
          <TravelInfoForm onSubmit={handleStep1} initialValues={step1Data} />
          <TravelersForm onSubmit={handleStep2} initialValues={step2Data} />
          <AdditionalServicesForm onSubmit={handleStep3} initialValues={step3Data} />
          <BookingSummary
            travelInfo={step1Data!}
            travelersInfo={step2Data!}
            additionalServices={step3Data!}
            confirmed={bookingConfirmed}
          />
        </Wizard>
      </div>
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
