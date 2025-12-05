import React, { createContext, ReactNode, useContext, useState } from 'react';

interface Team {
  id: number;
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
  selectedTeams: Set<Team>;
  selectedPlayers: Set<number>;
  // You can add more data here as needed
}

interface AppContextType {
  appData: AppData;
  setSelectedTeams: (teams: Set<Team>) => void;
  setSelectedPlayers: (players: Set<number>) => void;
  // Helper methods
  getSelectedTeamsArray: () => Team[];
  getSelectedPlayersArray: () => number[];
  // Reset method
  resetData: () => void;
}

const defaultData: AppData = {
  selectedTeams: new Set<Team>(),
  selectedPlayers: new Set(),
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appData, setAppData] = useState<AppData>(defaultData);

  const setSelectedTeams = (teams: Set<Team>) => {
    setAppData(prev => ({ ...prev, selectedTeams: teams }));
  };

  const setSelectedPlayers = (players: Set<number>) => {
    setAppData(prev => ({ ...prev, selectedPlayers: players }));
  };

  const getSelectedTeamsArray = (): Team[] => {
    return Array.from(appData.selectedTeams);
  };

  const getSelectedPlayersArray = (): number[] => {
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

