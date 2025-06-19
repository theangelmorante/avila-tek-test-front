import React from 'react';
import Input from '../atoms/Input';
import DatePicker from '../atoms/DatePicker';
import Select, { Option } from '../atoms/Select';

const documentTypes: Option[] = [
  { value: 'dni', label: 'DNI' },
  { value: 'passport', label: 'Pasaporte' },
  { value: 'id', label: 'Cédula' },
];

interface TravelerFieldsProps {
  index: number;
  name: string;
  birthDate: Date | null;
  documentType: Option | null;
  documentNumber: string;
  onChange: (field: string, value: Option | string | Date | null) => void;
}

const TravelerFields: React.FC<TravelerFieldsProps> = ({
  index,
  name,
  birthDate,
  documentType,
  documentNumber,
  onChange,
}) => (
  <div className="bg-[#015c30] rounded-xl p-4 mb-4 flex flex-col gap-4 border border-white/10">
    <h3 className="text-white font-bold text-lg mb-2">Viajero {index + 1}</h3>
    <Input
      label="Nombre completo"
      value={name}
      onChange={e => onChange('name', e.target.value)}
      placeholder="Nombre y apellido"
      required
    />
    <DatePicker
      label="Fecha de nacimiento"
      selected={birthDate}
      onChange={date => onChange('birthDate', date)}
      placeholderText="Selecciona fecha de nacimiento"
      required
      maxDate={new Date()}
    />
    <div className="flex flex-col md:flex-row gap-4">
      <Select
        label="Tipo de documento"
        options={documentTypes}
        value={documentType}
        onChange={option => onChange('documentType', option)}
        placeholder="Selecciona tipo"
        required
      />
      <Input
        label="Número de documento"
        value={documentNumber}
        onChange={e => onChange('documentNumber', e.target.value)}
        placeholder="Ej: 12345678"
        required
      />
    </div>
  </div>
);

export default TravelerFields; 