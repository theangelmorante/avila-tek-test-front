import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Switch from '../atoms/Switch';
import Textarea from '../atoms/Textarea';
import { AdditionalServicesFormData } from '../../types';

const MAX_NOTE_LENGTH = 200;

const AdditionalServicesForm: React.FC = () => {
  const { control, watch, formState: { errors } } = useFormContext<{ additionalServices: AdditionalServicesFormData }>();
  const specialAssistance = watch('additionalServices.specialAssistance');

  return (
    <form className="flex flex-col gap-6 w-full max-w-xl mx-auto p-0" autoComplete="off">
      <Controller
        name="additionalServices.travelInsurance"
        control={control}
        render={({ field }) => (
          <Switch
            label="¿Deseas agregar seguro de viaje?"
            checked={!!field.value}
            onChange={e => field.onChange(e.target.checked)}
          />
        )}
      />
      <Controller
        name="additionalServices.preferentialSeats"
        control={control}
        render={({ field }) => (
          <Switch
            label="¿Deseas seleccionar asientos preferenciales?"
            checked={!!field.value}
            onChange={e => field.onChange(e.target.checked)}
          />
        )}
      />
      <Controller
        name="additionalServices.specialAssistance"
        control={control}
        render={({ field }) => (
          <Switch
            label="¿Requiere asistencia especial?"
            checked={!!field.value}
            onChange={e => field.onChange(e.target.checked)}
          />
        )}
      />
      {specialAssistance && (
        <Controller
          name="additionalServices.assistanceNote"
          control={control}
          rules={{ required: specialAssistance, maxLength: MAX_NOTE_LENGTH }}
          render={({ field }) => (
            <Textarea
              label="Describe brevemente la asistencia requerida (máx. 200 caracteres)"
              value={field.value || ''}
              onChange={e => field.onChange(e.target.value.slice(0, MAX_NOTE_LENGTH))}
              maxLength={MAX_NOTE_LENGTH}
              required
              placeholder="Ej: Silla de ruedas, ayuda visual, etc."
            />
          )}
        />
      )}
      {errors.additionalServices?.assistanceNote && (
        <div className="text-red-200 text-sm">Por favor, escribe una nota de asistencia (máx. 200 caracteres).</div>
      )}
    </form>
  );
};

export default AdditionalServicesForm; 