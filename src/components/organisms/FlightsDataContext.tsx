'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const DATA_URL = 'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json';


export interface FlightsData {
  class: string;
  destination: string;
  priceUSD: number
}

interface FlightsDataContextProps {
  data: FlightsData[] | null;
  loading: boolean;
  error: string | null;
  destinatios: Set<string>;
  classes: ClassesByDestination;
}

export interface ClassesByDestination {
  [destination: string]: Set<string>;
}

const FlightsDataContext = createContext<FlightsDataContextProps | undefined>(undefined);

export const FlightsDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FlightsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [destinatios, setDestination] = useState<Set<string>>(new Set());
  const [classes, setClasses] = useState<ClassesByDestination>({});

  useEffect(() => {
    setLoading(true);
    fetch(DATA_URL)
      .then(res => res.json())
      .then(res => {
        setData(res);
        const auxDestinationsSet: Set<string> = new Set();
        const auxClasses: ClassesByDestination = {};
        res.map((item: FlightsData) => {
          auxDestinationsSet.add(item.destination);
          if (!auxClasses[item.destination]) {
            auxClasses[item.destination] = new Set()
          }
          auxClasses[item.destination].add(item.class)
        })
        setDestination(auxDestinationsSet)
        setClasses(auxClasses)
      })
      .catch(() => setError('Error al cargar los datos de vuelos'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FlightsDataContext.Provider value={{ data, loading, error, destinatios, classes }}>
      {children}
    </FlightsDataContext.Provider>
  );
};

export const useFlightsData = () => {
  const context = useContext(FlightsDataContext);
  if (!context) throw new Error('useFlightsData debe usarse dentro de FlightsDataProvider');
  return context;
}; 