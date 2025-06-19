import React from 'react';
import Select, { Option } from '../atoms/Select';
import { useFlightsData } from '../organisms/FlightsDataContext';

interface FlightClassSelectProps {
  value: Option | null;
  onChange: (option: Option | null) => void;
  destinationCode?: string;
}

const FlightClassSelect: React.FC<FlightClassSelectProps> = ({ value, onChange, destinationCode }) => {
  const { classes, loading } = useFlightsData();

  let options: Option[] = [];
  if (destinationCode && classes) {
    const dest = classes[destinationCode];
    if (dest) {
      options = [...dest].map((cls: string) => ({
        value: cls,
        label: cls.charAt(0).toUpperCase() + cls.slice(1),
      }));
    }
  }

  return (
    <Select
      label="Clase de vuelo"
      options={options}
      value={value}
      onChange={(option) => onChange(option as Option | null)}
      isLoading={loading}
      placeholder="Selecciona clase..."
      isClearable
      isDisabled={!destinationCode}
    />
  );
};

export default FlightClassSelect; 