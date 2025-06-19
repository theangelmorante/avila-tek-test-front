'use client'
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TravelerFields from '../molecules/TravelerFields';
import Input from '../atoms/Input';
import { Traveler, TravelersFormData } from '../../types';

const MAX_TRAVELERS = 10;
const MIN_TRAVELERS = 1;

const TravelersForm: React.FC = () => {
  const { control, watch, setValue, formState: { errors } } = useFormContext<{ travelersInfo: TravelersFormData }>();
  const travelers: Traveler[] = watch('travelersInfo.travelers') || [{ name: '', birthDate: null, documentType: null, documentNumber: '' }];
  const numTravelers = travelers.length;
  const pets = watch('travelersInfo.pets') || 0;
  const extraBags = watch('travelersInfo.extraBags') || 0;
  const hasPets = pets > 0;
  const hasBags = extraBags > 0;

  const handleNumTravelersChange = (val: number) => {
    const arr = [...travelers];
    while (arr.length < val) arr.push({ name: '', birthDate: null, documentType: null, documentNumber: '' });
    while (arr.length > val) arr.pop();
    setValue('travelersInfo.travelers', arr);
  };

  return (
    <form className="flex flex-col gap-6 w-full max-w-xl mx-auto p-0" autoComplete="off">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <label className="text-white font-semibold text-lg mr-4">Número de viajeros</label>
        <div className="flex items-center bg-[#015c30] rounded-2xl px-4 py-2 shadow-md border border-white/10">
          <button
            type="button"
            className="text-white text-2xl w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors focus:outline-none disabled:opacity-30 cursor-pointer"
            onClick={() => handleNumTravelersChange(Math.max(MIN_TRAVELERS, numTravelers - 1))}
            disabled={numTravelers <= MIN_TRAVELERS}
            aria-label="Disminuir viajeros"
          >
            -
          </button>
          <span className="text-white text-lg font-bold w-12 text-center select-none">{numTravelers}</span>
          <button
            type="button"
            className="text-white text-2xl w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors focus:outline-none disabled:opacity-30 cursor-pointer"
            onClick={() => handleNumTravelersChange(Math.min(MAX_TRAVELERS, numTravelers + 1))}
            disabled={numTravelers >= MAX_TRAVELERS}
            aria-label="Aumentar viajeros"
          >
            +
          </button>
        </div>
      </div>
      <div className="max-h-[350px] overflow-y-auto pr-2 flex flex-col gap-4">
        {travelers.map((t: Traveler, idx: number) => (
          <Controller
            key={idx}
            name={`travelersInfo.travelers.${idx}`}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TravelerFields
                index={idx}
                name={field.value.name}
                birthDate={field.value.birthDate}
                documentType={field.value.documentType}
                documentNumber={field.value.documentNumber}
                onChange={(fieldName, value) => {
                  const updated = { ...field.value, [fieldName]: value };
                  field.onChange(updated);
                }}
              />
            )}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 max-w-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-white font-semibold">¿Viajas con mascotas?</span>
          <div className="flex items-center gap-4">
            <Controller
              name="travelersInfo.pets"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  checked={field.value > 0}
                  onChange={e => field.onChange(e.target.checked ? 1 : 0)}
                  className="w-5 h-5 rounded-lg accent-[#1976D2] cursor-pointer"
                />
              )}
            />
            {hasPets && (
              <div className="flex items-center bg-[#015c30] rounded-2xl px-4 py-2 shadow-md border border-white/10">
                <button
                  type="button"
                  className="text-white text-2xl w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors focus:outline-none disabled:opacity-30 cursor-pointer"
                  onClick={() => setValue('travelersInfo.pets', Math.max(1, pets - 1))}
                  disabled={pets <= 1}
                >
                  -
                </button>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={pets}
                  onChange={e => setValue('travelersInfo.pets', Math.max(0, Math.min(10, Number(e.target.value))))}
                  className="w-12 text-center bg-transparent text-white font-bold border-none focus:outline-none"
                />
                <button
                  type="button"
                  className="text-white text-2xl w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors focus:outline-none disabled:opacity-30 cursor-pointer"
                  onClick={() => setValue('travelersInfo.pets', Math.min(10, pets + 1))}
                  disabled={pets >= 10}
                >
                  +
                </button>
              </div>
            )}
            {hasPets && <span className="text-white ml-2">Costo: ${pets * 100}</span>}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-white font-semibold">¿Necesitas maletas extra?</span>
          <div className="flex items-center gap-4">
            <Controller
              name="travelersInfo.extraBags"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  checked={field.value > 0}
                  onChange={e => field.onChange(e.target.checked ? 1 : 0)}
                  className="w-5 h-5 rounded-lg accent-[#1976D2] cursor-pointer"
                />
              )}
            />
            {hasBags && (
              <div className="flex items-center bg-[#015c30] rounded-2xl px-4 py-2 shadow-md border border-white/10">
                <button
                  type="button"
                  className="text-white text-2xl w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors focus:outline-none disabled:opacity-30 cursor-pointer"
                  onClick={() => setValue('travelersInfo.extraBags', Math.max(1, extraBags - 1))}
                  disabled={extraBags <= 1}
                >
                  -
                </button>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={extraBags}
                  onChange={e => setValue('travelersInfo.extraBags', Math.max(0, Math.min(10, Number(e.target.value))))}
                  className="w-12 text-center bg-transparent text-white font-bold border-none focus:outline-none"
                />
                <button
                  type="button"
                  className="text-white text-2xl w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors focus:outline-none disabled:opacity-30 cursor-pointer"
                  onClick={() => setValue('travelersInfo.extraBags', Math.min(10, extraBags + 1))}
                  disabled={extraBags >= 10}
                >
                  +
                </button>
              </div>
            )}
            {hasBags && <span className="text-white ml-2">Costo: ${extraBags * 50}</span>}
          </div>
        </div>
      </div>
      {errors.travelersInfo && (
        <div className="text-red-200 text-sm">Por favor, completa todos los datos de los viajeros.</div>
      )}
    </form>
  );
};

export default TravelersForm; 