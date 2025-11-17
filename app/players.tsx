import { useRouter } from 'expo-router';
import React from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Checkbox, List, SegmentedButtons, Avatar } from 'react-native-paper';


type Position = 'forward' | 'midfield' | 'defender' | 'goalkeeper';

interface Player {
  id: string;
  name: string;
  position?: string;
  img_url?: string;
}

const SAMPLE_PLAYERS: Player[] = [
  { id: '0', name: 'Adrian' , position:"goalkeeper"},
  { id: '1', name: 'Log' , position:"goalkeeper"},
  { id: '2', name: 'Vids' , position:"defender"},
  { id: '3', name: 'Conrad' , position:"defender"},
  { id: '4', name: 'Tyler' , position:"defender"},
  { id: '5', name: 'Beni' , position:"defender"},
  { id: '6', name: 'Louis', position:"midfieald" },
  { id: '7', name: 'Miller' , position:"forward"},
  { id: '8', name: 'Jack', position:"midfieald" },
  { id: '9', name: 'Brede' , position:"forward"},
  { id: '10', name: 'Woody', position:"midfieald" },
  { id: '11', name: 'Arnord' , position:"forward"},
  { id: '12', name: 'Xav A' , position:"midfieald"},
  { id: '13', name: 'Rinta', position:"midfieald" },
  { id: '14', name: 'Aysa' , position:"forward"},
  { id: '15', name: 'Sam' , position:"forward"},
  { id: '16', name: 'Ling' , position:"defender"},
  { id: '17', name: 'Nathan' , position:"defender"},
  { id: '18', name: 'Xav C' , position:"defender"},
  { id: '19', name: 'Hunter' , position:"defender"},
  { id: '20', name: 'Owen', position:"midfieald", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FOwen_Lagerwey_2025_Headshot.png&width=100&height=100&type=webp" },
  { id: '21', name: 'Lenny' , position:"defender"},
  { id: '22', name: 'Jaxon', position:"midfieald" },
  { id: '24', name: 'Poul' , position:"defender"},
  { id: '27', name: 'David' , position:"defender"},
  { id: '28', name: 'Dylan K', position:"midfieald" },
  { id: '29', name: 'Spijkers' , position:"defender"},
  { id: '30', name: 'Andrew', position:"goalkeeper" },
  { id: '31', name: 'AJ' , position:"goalkeeper"},
  { id: '32', name: 'Nico' , position:"midfieald"},
  { id: '33', name: 'Dylan C', position:"midfieald" },
  { id: '34', name: 'Edvin', position:"midfieald" },
  { id: '35', name: 'Eli' , position:"forward"},
  { id: '36', name: 'Logan' , position:"defender"},
  { id: '37', name: 'Rodrigo', position:"forward" },
  { id: '40', name: 'Lucca', position:"goalkeeper" },
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
            title={
              <View style={styles.titleContainer}>
                <Text style={styles.playerName}>{player.name}</Text>
                {player.position && (
                  <Text style={styles.playerPosition}>{player.position}</Text>
                )}
              </View>
            }
            left={() => (
              <>
              <Checkbox
                status={selectedPlayers.has(player.id) ? 'checked' : 'unchecked'}
                onPress={() => togglePlayer(player.id)}
              />
              <Avatar.Image source={{ uri: player.img_url}} size={60}/>
              </>

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
  titleContainer:{
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerPosition: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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


