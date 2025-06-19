import React from 'react';
import Select, { Option } from '../atoms/Select';
import { useFlightsData } from '../organisms/FlightsDataContext';

interface DestinationAutocompleteProps {
  value: Option | null;
  onChange: (option: Option | null) => void;
}

const DestinationAutocomplete: React.FC<DestinationAutocompleteProps> = ({ value, onChange }) => {
  const { destinatios, loading } = useFlightsData();

  const options: Option[] = [...destinatios]?.map(dest => ({
    value: dest,
    label: dest,
  })) || [];

  return (
    <Select
      label="Destino"
      options={options}
      value={value}
      onChange={(option) => onChange(option as Option | null)}
      isLoading={loading}
      placeholder="Selecciona un destino..."
      isClearable
      className='text-white'
    />
  );
};

export default DestinationAutocomplete; 