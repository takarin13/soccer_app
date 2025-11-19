import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Team {
  id: string;
  name: string;
  home_or_away?: string;
  conference?: string;
  img_url?: string;
}

interface Player {
  id: string;
  name: string;
  position?: string;
  img_url?: string;
}

interface AppData {
  selectedTeams: Set<string>;
  selectedPlayers: Set<string>;
  // You can add more data here as needed
}

interface AppContextType {
  appData: AppData;
  setSelectedTeams: (teams: Set<string>) => void;
  setSelectedPlayers: (players: Set<string>) => void;
  // Helper methods
  getSelectedTeamsArray: () => string[];
  getSelectedPlayersArray: () => string[];
  // Reset method
  resetData: () => void;
}

const defaultData: AppData = {
  selectedTeams: new Set(),
  selectedPlayers: new Set(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appData, setAppData] = useState<AppData>(defaultData);

  const setSelectedTeams = (teams: Set<string>) => {
    setAppData(prev => ({ ...prev, selectedTeams: teams }));
  };

  const setSelectedPlayers = (players: Set<string>) => {
    setAppData(prev => ({ ...prev, selectedPlayers: players }));
  };

  const getSelectedTeamsArray = () => {
    return Array.from(appData.selectedTeams);
  };

  const getSelectedPlayersArray = () => {
    return Array.from(appData.selectedPlayers);
  };

  const resetData = () => {
    setAppData(defaultData);
  };

  return (
    <AppContext.Provider
      value={{
        appData,
        setSelectedTeams,
        setSelectedPlayers,
        getSelectedTeamsArray,
        getSelectedPlayersArray,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

