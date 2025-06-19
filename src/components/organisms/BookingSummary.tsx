import React from 'react';
import { TravelInfoFormData } from './TravelInfoForm';
import { TravelersFormData } from './TravelersForm';
import { AdditionalServicesFormData } from './AdditionalServicesForm';

interface BookingSummaryProps {
  travelInfo: TravelInfoFormData;
  travelersInfo: TravelersFormData;
  additionalServices: AdditionalServicesFormData;
  confirmed: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ travelInfo, travelersInfo, additionalServices, confirmed }) => {
  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-12">
        <div className="text-green-400 text-2xl font-bold">¡Reserva confirmada!</div>
        <div className="text-white text-lg">Te hemos enviado un correo con los detalles de tu viaje.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto p-0">
      <h2 className="text-xl font-bold text-white mb-2">Resumen de tu reserva</h2>
      <div className="bg-white/10 rounded-2xl p-4 text-white text-base flex flex-col gap-2">
        <div><span className="font-semibold">Destino:</span> {travelInfo.destination.label}</div>
        <div><span className="font-semibold">Fechas:</span> {travelInfo.departureDate.toLocaleDateString()} - {travelInfo.returnDate.toLocaleDateString()}</div>
        <div><span className="font-semibold">Clase de vuelo:</span> {travelInfo.flightClass.label}</div>
        <div><span className="font-semibold">Viajeros:</span> {travelersInfo.travelers.length} (
          {travelersInfo.travelers.map((t, i) => (
            <span key={i}>{t.birthDate ? `${Math.floor((new Date().getTime() - new Date(t.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25))} años` : 'Edad no especificada'}{i < travelersInfo.travelers.length - 1 ? ', ' : ''}</span>
          ))}
          )</div>
        {travelersInfo.pets > 0 && (
          <div><span className="font-semibold">Mascotas:</span> {travelersInfo.pets}</div>
        )}
        {travelersInfo.extraBags > 0 && (
          <div><span className="font-semibold">Maletas extra:</span> {travelersInfo.extraBags}</div>
        )}
        <div className="font-semibold mt-2">Servicios adicionales:</div>
        <ul className="list-disc ml-6">
          <li>{additionalServices.travelInsurance ? 'Seguro de viaje: Sí' : 'Seguro de viaje: No'}</li>
          <li>{additionalServices.preferentialSeats ? 'Asientos preferenciales: Sí' : 'Asientos preferenciales: No'}</li>
          <li>{additionalServices.specialAssistance ? `Asistencia especial: Sí${additionalServices.assistanceNote ? ` (${additionalServices.assistanceNote})` : ''}` : 'Asistencia especial: No'}</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingSummary; 