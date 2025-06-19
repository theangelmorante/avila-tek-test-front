import React, { useState } from 'react';
import TravelerFields from '../molecules/TravelerFields';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface Traveler {
  name: string;
  birthDate: Date | null;
  documentType: { value: string; label: string } | null;
  documentNumber: string;
}

export interface TravelersFormData {
  travelers: Traveler[];
  pets: number;
  extraBags: number;
}

interface TravelersFormProps {
  onSubmit: (data: TravelersFormData) => void;
}

const MAX_TRAVELERS = 10;
const MIN_TRAVELERS = 1;

type TravelerField = 'name' | 'birthDate' | 'documentType' | 'documentNumber';

type TravelerFieldValue = string | Date | { value: string; label: string } | null;

const TravelersForm: React.FC<TravelersFormProps> = ({ onSubmit }) => {
  const [numTravelers, setNumTravelers] = useState(1);
  const [travelers, setTravelers] = useState<Traveler[]>([
    { name: '', birthDate: null, documentType: null, documentNumber: '' },
  ]);
  const [hasPets, setHasPets] = useState(false);
  const [pets, setPets] = useState(0);
  const [hasBags, setHasBags] = useState(false);
  const [extraBags, setExtraBags] = useState(0);
  const [touched, setTouched] = useState(false);

  // Sin validación profunda para simplificar
  const isValid = travelers.every(
    t => t.name && t.birthDate && t.documentType && t.documentNumber
  );

  const handleTravelerChange = (idx: number, field: TravelerField, value: TravelerFieldValue) => {
    setTravelers(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleNumTravelersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(MIN_TRAVELERS, Math.min(MAX_TRAVELERS, Number(e.target.value)));
    setNumTravelers(val);
    setTravelers(prev => {
      const arr = [...prev];
      while (arr.length < val) arr.push({ name: '', birthDate: null, documentType: null, documentNumber: '' });
      while (arr.length > val) arr.pop();
      return arr;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onSubmit({ travelers, pets: hasPets ? pets : 0, extraBags: hasBags ? extraBags : 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl mx-auto p-0">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Input
          label="Número de viajeros"
          type="number"
          min={MIN_TRAVELERS}
          max={MAX_TRAVELERS}
          value={numTravelers}
          onChange={handleNumTravelersChange}
          className="w-40"
        />
      </div>
      {travelers.map((t, idx) => (
        <TravelerFields
          key={idx}
          index={idx}
          name={t.name}
          birthDate={t.birthDate}
          documentType={t.documentType}
          documentNumber={t.documentNumber}
          onChange={(field, value) => handleTravelerChange(idx, field as TravelerField, value as TravelerFieldValue)}
        />
      ))}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">¿Viajas con mascotas?</span>
          <input type="checkbox" checked={hasPets} onChange={e => setHasPets(e.target.checked)} />
          {hasPets && (
            <Input
              type="number"
              min={1}
              max={10}
              value={pets}
              onChange={e => setPets(Math.max(0, Math.min(10, Number(e.target.value))))}
              className="w-20"
              placeholder="Cantidad"
            />
          )}
          {hasPets && <span className="text-white ml-2">Costo: ${pets * 100}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">¿Necesitas maletas extra?</span>
          <input type="checkbox" checked={hasBags} onChange={e => setHasBags(e.target.checked)} />
          {hasBags && (
            <Input
              type="number"
              min={1}
              max={10}
              value={extraBags}
              onChange={e => setExtraBags(Math.max(0, Math.min(10, Number(e.target.value))))}
              className="w-20"
              placeholder="Cantidad"
            />
          )}
          {hasBags && <span className="text-white ml-2">Costo: ${extraBags * 50}</span>}
        </div>
      </div>
      {touched && !isValid && (
        <div className="text-red-200 text-sm">Por favor, completa todos los datos de los viajeros.</div>
      )}
      <Button type="submit" className="mt-4">Siguiente</Button>
    </form>
  );
};

export default TravelersForm; 