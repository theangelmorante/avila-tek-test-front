'use client'
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import DestinationAutocomplete from '../molecules/DestinationAutocomplete';
import FlightClassSelect from '../molecules/FlightClassSelect';
import DateRangeFields from '../molecules/DateRangeFields';
import { Option, TravelInfoFormData } from '../../types';

const TravelInfoForm: React.FC = () => {
  const { control, formState: { errors }, watch, setValue } = useFormContext<{ travelInfo: TravelInfoFormData }>();

  return (
    <form className="flex flex-col gap-6 w-full max-w-xl mx-auto p-6 rounded" autoComplete="off">
      <Controller
        name="travelInfo.destination"
        control={control}
        rules={{ required: 'El destino es obligatorio' }}
        render={({ field }) => (
          <DestinationAutocomplete
            value={field.value as Option}
            onChange={field.onChange}
          />
        )}
      />
      <DateRangeFields
        departureDate={watch('travelInfo.departureDate')}
        returnDate={watch('travelInfo.returnDate')}
        onDepartureChange={date => setValue('travelInfo.departureDate', date)}
        onReturnChange={date => setValue('travelInfo.returnDate', date)}
        minDate={new Date()}
      />
      <Controller
        name="travelInfo.flightClass"
        control={control}
        rules={{ required: 'La clase de vuelo es obligatoria' }}
        render={({ field }) => (
          <FlightClassSelect
            value={field.value as Option}
            onChange={field.onChange}
            destinationCode={watch('travelInfo.destination')?.value}
          />
        )}
      />
      {(errors.travelInfo?.destination || errors.travelInfo?.flightClass || errors.travelInfo?.departureDate || errors.travelInfo?.returnDate) && (
        <div className="text-red-500 text-sm">Por favor, completa todos los campos correctamente.</div>
      )}
    </form>
  );
};

export default TravelInfoForm; 