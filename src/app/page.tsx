import React from 'react';
import { FlightsDataProvider } from '../components/organisms/FlightsDataContext';
import WizardSteps from '../components/templates/WizardSteps';

export default function Home() {
  return (
    <div className="min-h-screen w-full relative" style={{ backgroundImage: 'url(/background.png)', backgroundRepeat: 'repeat', backgroundSize: 'contain', backgroundBlendMode: 'multiply' }}>
      <div className="absolute inset-0 bg-[#03230d]/80 pointer-events-none z-0" />
      <div className="relative z-10">
        <FlightsDataProvider>
          <WizardSteps />
        </FlightsDataProvider>
      </div>
    </div>
  );
}
