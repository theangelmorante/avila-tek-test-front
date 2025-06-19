import React from 'react';

interface WizardStepTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const WizardStepTemplate: React.FC<WizardStepTemplateProps> = ({ title, description, children }) => (
  <section className="min-h-screen flex flex-col items-center justify-center bg-[#303F9F] py-8 px-4">
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-[#448AFF] rounded-2xl shadow-lg p-8 min-h-[75vh]">
        <h1 className="text-3xl font-bold mb-2 text-white text-center drop-shadow-lg">{title}</h1>
        {description && <p className="text-lg text-white/90 mb-8 text-center font-medium drop-shadow">{description}</p>}
        <div className="bg-[#448AFF] rounded-2xl p-0">
          {children}
        </div>
      </div>
    </div>
  </section>
);

export default WizardStepTemplate; 