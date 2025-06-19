'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import WizardStepTemplate from '../components/templates/WizardStepTemplate';
import TravelInfoForm from '../components/organisms/TravelInfoForm';
import TravelersForm from '../components/organisms/TravelersForm';
import { FlightsDataProvider } from '../components/organisms/FlightsDataContext';
import { Wizard } from 'react-use-wizard';
import HeaderWizard from '@/components/molecules/HeaderWizard';
import AdditionalServicesForm from '../components/organisms/AdditionalServicesForm';
import BookingSummary from '../components/organisms/BookingSummary';
import WizardFooter from '../components/molecules/WizardFooter';
import { WizardFormValues } from '../types';

function WizardSteps() {
  const methods = useForm<WizardFormValues>({
    mode: 'onChange',
    defaultValues: {
      travelInfo: {
        destination: null,
        departureDate: null,
        returnDate: null,
        flightClass: null,
      },
      travelersInfo: {
        travelers: [{ name: '', birthDate: null, documentType: null, documentNumber: '' }],
        pets: 0,
        extraBags: 0,
      },
      additionalServices: {
        travelInsurance: false,
        preferentialSeats: false,
        specialAssistance: false,
        assistanceNote: '',
      },
    },
  });
  const [bookingConfirmed, setBookingConfirmed] = React.useState(false);

  // Validación estricta por paso
  const isStepValid = [
    // Paso 1: todos los campos travelInfo completos
    !!(methods.watch('travelInfo')?.destination && methods.watch('travelInfo')?.flightClass && methods.watch('travelInfo')?.departureDate && methods.watch('travelInfo')?.returnDate),
    // Paso 2: solo si el paso 1 es válido y viajeros completos
    false, // se calcula abajo
    // Paso 3: solo si el 1 y 2 son válidos y servicios válidos
    false, // se calcula abajo
    // Paso 4: solo si todos los anteriores son válidos
    false, // se calcula abajo
  ];
  isStepValid[1] = isStepValid[0] && !!(Array.isArray(methods.watch('travelersInfo')?.travelers) && methods.watch('travelersInfo')?.travelers.length > 0 && methods.watch('travelersInfo')?.travelers.every(
    t => t.name && t.birthDate && t.documentType && t.documentNumber
  ));
  isStepValid[2] = isStepValid[0] && isStepValid[1] && !!(typeof methods.watch('additionalServices')?.travelInsurance === 'boolean' &&
    typeof methods.watch('additionalServices')?.preferentialSeats === 'boolean' &&
    typeof methods.watch('additionalServices')?.specialAssistance === 'boolean' &&
    (!methods.watch('additionalServices')?.specialAssistance || (methods.watch('additionalServices')?.assistanceNote && methods.watch('additionalServices')?.assistanceNote.length > 0)));
  isStepValid[3] = isStepValid[0] && isStepValid[1] && isStepValid[2];

  const handleNewBooking = () => {
    methods.reset();
    setBookingConfirmed(false);
  };

  return (
    <FormProvider {...methods}>
      <WizardStepTemplate
        title="Información del Viaje"
        description="Completa los datos para buscar tu vuelo ideal."
      >
        <div className="min-h-[400px] md:min-h-[500px] max-h-[90vh] overflow-y-auto flex flex-col justify-between">
          <Wizard
            header={<HeaderWizard completed={isStepValid} />}
            footer={
              <WizardFooter
                isStepValid={isStepValid}
                onFinish={() => setBookingConfirmed(true)}
                bookingConfirmed={bookingConfirmed}
                onNewBooking={handleNewBooking}
              />
            }
          >
            <TravelInfoForm />
            <TravelersForm />
            <AdditionalServicesForm />
            <BookingSummary confirmed={bookingConfirmed} />
          </Wizard>
        </div>
      </WizardStepTemplate>
    </FormProvider>
  );
}

export default function Home() {
  return (
    <FlightsDataProvider>
      <WizardSteps />
    </FlightsDataProvider>
  );
}
