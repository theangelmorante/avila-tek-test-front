export interface Option {
  value: string;
  label: string;
}

export interface Traveler {
  name: string;
  birthDate: Date | null;
  documentType: Option | null;
  documentNumber: string;
}

export interface TravelInfoFormData {
  destination: Option | null;
  departureDate: Date | null;
  returnDate: Date | null;
  flightClass: Option | null;
}

export interface TravelersFormData {
  travelers: Traveler[];
  pets: number;
  extraBags: number;
}

export interface AdditionalServicesFormData {
  travelInsurance: boolean;
  preferentialSeats: boolean;
  specialAssistance: boolean;
  assistanceNote: string;
}

export interface WizardFormValues {
  travelInfo: TravelInfoFormData;
  travelersInfo: TravelersFormData;
  additionalServices: AdditionalServicesFormData;
}
