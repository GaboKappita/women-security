// LocationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationCoords {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface LocationContextProps {
    location: LocationCoords | null;
    setLocation: React.Dispatch<React.SetStateAction<LocationCoords | null>>;
    locationEnabled: boolean;
    setLocationEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crear el contexto con un valor por defecto
const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<LocationCoords | null>(null);
    const [locationEnabled, setLocationEnabled] = useState(false);

    return (
        <LocationContext.Provider value={{ location, setLocation, locationEnabled, setLocationEnabled }}>
            {children}
        </LocationContext.Provider>
    );
};

// Custom hook para usar el contexto
export const useLocation = (): LocationContextProps => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation debe ser utilizado dentro de un LocationProvider');
    }
    return context;
};
