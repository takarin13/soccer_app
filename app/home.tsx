import { useRouter } from 'expo-router';
import React from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Checkbox, List, SegmentedButtons } from 'react-native-paper';

type Position = 'forward' | 'midfield' | 'defender' | 'goalkeeper';

interface Player {
  id: string;
  name: string;
}

const SAMPLE_PLAYERS: Player[] = [
  { id: '1', name: 'John Smith' },
  { id: '2', name: 'Mike Johnson' },
  { id: '3', name: 'David Williams' },
  { id: '4', name: 'Chris Brown' },
  { id: '5', name: 'Alex Davis' },
  { id: '6', name: 'Ryan Miller' },
  { id: '7', name: 'Jordan Wilson' },
  { id: '8', name: 'Sam Taylor' },
  { id: '9', name: 'Jamie Anderson' },
  { id: '10', name: 'Casey Martinez' },
];

export default function HomeScreen() {
  const [selectedPosition, setSelectedPosition] = React.useState<Position>('forward');
  const [selectedPlayers, setSelectedPlayers] = React.useState<Set<string>>(new Set());

  // Notes:

  console.log('Players selected:', selectedPlayers);
  console.log('Position selected:', selectedPosition);
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const togglePlayer = (playerId: string) => {
    setSelectedPlayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    // Store the selected position and players
    console.log('Selected Position:', selectedPosition);
    console.log('Selected Players:', Array.from(selectedPlayers));
    // Navigate to next screen
    handleNavigation('/games');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SegmentedButtons
          value={selectedPosition}
          onValueChange={(value) => setSelectedPosition(value as Position)}
          buttons={[
            { value: 'forward', label: 'Forward' },
            { value: 'midfield', label: 'Midfield' },
            { value: 'defender', label: 'Defender' },
            { value: 'goalkeeper', label: 'Goalkeeper' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <ScrollView style={styles.playerList} contentContainerStyle={styles.playerListContent}>
        {SAMPLE_PLAYERS.map((player) => (
          <List.Item
            key={player.id}
            title={player.name}
            left={() => (
              <Checkbox
                status={selectedPlayers.has(player.id) ? 'checked' : 'unchecked'}
                onPress={() => togglePlayer(player.id)}
              />
            )}
            style={styles.listItem}
            titleStyle={styles.playerName}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.nextButton}
          contentStyle={styles.nextButtonContent}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  segmentedButtons: {
    marginVertical: 8,
  },
  playerList: {
    flex: 1,
  },
  playerListContent: {
    paddingVertical: 8,
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  playerName: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  nextButton: {
    borderRadius: 8,
  },
  nextButtonContent: {
    paddingVertical: 8,
  },
});


