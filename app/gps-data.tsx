// place to store all global variables:
import { useAppContext } from '@/context/AppContext';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GPSScreen() {
  // Access the context to get selected teams and other data
  const { appData, getSelectedTeamsArray, getSelectedPlayersArray } = useAppContext();

  // Get selected teams as an array (easier to work with)
  const selectedTeamsArray = getSelectedTeamsArray();
  
  // Or access the Set directly from appData
  const selectedTeamsSet = appData.selectedTeams;
  
  // Also access other data if needed
  const selectedPlayers = getSelectedPlayersArray();

  useEffect(() => {
    // Log the data when component mounts or data changes
    console.log('Selected Teams (Array):', selectedTeamsArray);
    console.log('Selected Players:', selectedPlayers);
  }, [selectedTeamsArray, selectedTeamsSet, selectedPlayers]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>GPS Data</Text>
      <Text style={styles.text}>
        Selected Teams: {selectedTeamsArray.length > 0 ? selectedTeamsArray.join(', ') : 'None'}
      </Text>
      <Text style={styles.text}>
        Selected Players: {selectedPlayers.length > 0 ? selectedPlayers.join(', ') : 'None'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});

