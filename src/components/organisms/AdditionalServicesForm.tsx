import React, { useState } from 'react';
import Switch from '../atoms/Switch';
import Textarea from '../atoms/Textarea';

export interface AdditionalServicesFormData {
  travelInsurance: boolean;
  preferentialSeats: boolean;
  specialAssistance: boolean;
  assistanceNote: string;
}

interface AdditionalServicesFormProps {
  onSubmit: (data: AdditionalServicesFormData) => void;
  initialValues?: AdditionalServicesFormData | null;
}

const MAX_NOTE_LENGTH = 200;

const AdditionalServicesForm: React.FC<AdditionalServicesFormProps> = ({ onSubmit, initialValues }) => {
  const [travelInsurance, setTravelInsurance] = useState(initialValues?.travelInsurance ?? false);
  const [preferentialSeats, setPreferentialSeats] = useState(initialValues?.preferentialSeats ?? false);
  const [specialAssistance, setSpecialAssistance] = useState(initialValues?.specialAssistance ?? false);
  const [assistanceNote, setAssistanceNote] = useState(initialValues?.assistanceNote ?? '');
  const [touched, setTouched] = useState(false);

  const isNoteValid = !specialAssistance || (assistanceNote.trim().length > 0 && assistanceNote.length <= MAX_NOTE_LENGTH);
  const isValid = isNoteValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onSubmit({
      travelInsurance,
      preferentialSeats,
      specialAssistance,
      assistanceNote: specialAssistance ? assistanceNote.trim() : '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl mx-auto p-0">
      <Switch
        label="¿Deseas agregar seguro de viaje?"
        checked={travelInsurance}
        onChange={e => setTravelInsurance(e.target.checked)}
      />
      <Switch
        label="¿Deseas seleccionar asientos preferenciales?"
        checked={preferentialSeats}
        onChange={e => setPreferentialSeats(e.target.checked)}
      />
      <Switch
        label="¿Requiere asistencia especial?"
        checked={specialAssistance}
        onChange={e => setSpecialAssistance(e.target.checked)}
      />
      {specialAssistance && (
        <Textarea
          label="Describe brevemente la asistencia requerida (máx. 200 caracteres)"
          value={assistanceNote}
          onChange={e => setAssistanceNote(e.target.value.slice(0, MAX_NOTE_LENGTH))}
          maxLength={MAX_NOTE_LENGTH}
          required
          placeholder="Ej: Silla de ruedas, ayuda visual, etc."
        />
      )}
      {touched && !isNoteValid && (
        <div className="text-red-200 text-sm">Por favor, escribe una nota de asistencia (máx. 200 caracteres).</div>
      )}
    </form>
  );
};

export default AdditionalServicesForm; 