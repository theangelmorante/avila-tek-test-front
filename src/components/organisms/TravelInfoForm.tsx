import React, { useState } from 'react';
import DestinationAutocomplete from '../molecules/DestinationAutocomplete';
import FlightClassSelect from '../molecules/FlightClassSelect';
import DateRangeFields from '../molecules/DateRangeFields';
import Button from '../atoms/Button';
import { Option } from '../atoms/Select';
import { useWizard } from 'react-use-wizard';

interface TravelInfoFormProps {
  onSubmit: (data: TravelInfoFormData) => void;
  initialValues?: TravelInfoFormData | null;
}

export interface TravelInfoFormData {
  destination: Option;
  departureDate: Date;
  returnDate: Date;
  flightClass: Option;
}

const TravelInfoForm: React.FC<TravelInfoFormProps> = ({ onSubmit, initialValues }) => {
  const { goToStep } = useWizard();
  const [destination, setDestination] = useState<Option | null>(initialValues?.destination ?? null);
  const [flightClass, setFlightClass] = useState<Option | null>(initialValues?.flightClass ?? null);
  const [departureDate, setDepartureDate] = useState<Date | null>(initialValues?.departureDate ?? null);
  const [returnDate, setReturnDate] = useState<Date | null>(initialValues?.returnDate ?? null);
  const [touched, setTouched] = useState(false);

  const isValid =
    !!destination &&
    !!flightClass &&
    !!departureDate &&
    !!returnDate &&
    departureDate <= returnDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('VEaMOS: ', e)
    setTouched(true);

    if (!isValid) return;
    console.log('IS VALID: ', isValid)
    console.log("DATA: ", {
      destination: destination!,
      departureDate: departureDate!,
      returnDate: returnDate!,
      flightClass: flightClass!,
    })
    onSubmit({
      destination: destination!,
      departureDate: departureDate!,
      returnDate: returnDate!,
      flightClass: flightClass!,
    });
    goToStep(1)
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-xl mx-auto p-6 rounded">
      <DestinationAutocomplete value={destination} onChange={option => {
        setDestination(option);
        setFlightClass(null); // Reset flight class if destination changes
      }} />
      <DateRangeFields
        departureDate={departureDate}
        returnDate={returnDate}
        onDepartureChange={setDepartureDate}
        onReturnChange={setReturnDate}
        minDate={new Date()}
      />
      <FlightClassSelect
        value={flightClass}
        onChange={setFlightClass}
        destinationCode={destination?.value}
      />
      {touched && !isValid && (
        <div className="text-red-500 text-sm">Por favor, completa todos los campos correctamente.</div>
      )}
      <Button type="submit" variant="primary" disabled={!isValid}>
        Siguiente
      </Button>
    </form>
  );
};

export default TravelInfoForm; 