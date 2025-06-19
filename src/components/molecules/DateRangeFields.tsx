import React from 'react';
import DatePicker from '../atoms/DatePicker';

interface DateRangeFieldsProps {
  departureDate: Date | null;
  returnDate: Date | null;
  onDepartureChange: (date: Date | null) => void;
  onReturnChange: (date: Date | null) => void;
  minDate?: Date;
}

const DateRangeFields: React.FC<DateRangeFieldsProps> = ({
  departureDate,
  returnDate,
  onDepartureChange,
  onReturnChange,
  minDate,
}) => (
  <div className="flex flex-col md:flex-row gap-4 w-full">
    <DatePicker
      label="Fecha de salida"
      selected={departureDate}
      onChange={onDepartureChange}
      minDate={minDate}
      placeholderText="Selecciona fecha de salida"
      required
    />
    <DatePicker
      label="Fecha de regreso"
      selected={returnDate}
      onChange={onReturnChange}
      minDate={departureDate || minDate}
      placeholderText="Selecciona fecha de regreso"
      required
    />
  </div>
);

export default DateRangeFields; 