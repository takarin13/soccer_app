import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Checkbox, List, SegmentedButtons } from 'react-native-paper';


type Position = 'All' | 'forward' | 'midfield' | 'defender' | 'goalkeeper';

interface Player {
  id: string;
  name: string;
  position: string;
  img_url?: string;
}

const SAMPLE_PLAYERS: Player[] = [
  { id: '0', name: 'Adrian' , position:"goalkeeper", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FAdrian_Najarro_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '1', name: 'Log' , position:"goalkeeper", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FLogi_Hjalested_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '2', name: 'Vids' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FVidar_Ragnarsson_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '3', name: 'Conrad' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FConrad_Eriksson_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '4', name: 'Tyler' , position:"defender", img_url: "https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FTyler_Leonard_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '5', name: 'Beni' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FBenian_Yao_2025_Headshot.jpg&width=100&height=100&type=webp"},
  { id: '6', name: 'Louis', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FLouis_Beckett_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '7', name: 'Miller' , position:"forward", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FMiller_Hayden_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '8', name: 'Jack', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FJack_Steel_2025_Headshot.jpg&width=100&height=100&type=webp"},
  { id: '9', name: 'Brede' , position:"forward", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FBrede_Fiksdal_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '10', name: 'Woody', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FCharlie_Wood_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '11', name: 'Arnord' , position:"forward", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FArnor_Hardarson_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '12', name: 'Xav A' , position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FXavier_Alcantar_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '13', name: 'Rinta', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FRinta_Takagi_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '14', name: 'Aysa' , position:"forward", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FAysa_Hamid_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '15', name: 'Sam' , position:"forward", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FSam_Howe_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '16', name: 'Ling' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FJoe_Ling_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '17', name: 'Nathan' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FNathan_Montini_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '18', name: 'Xav C' , position:"forword", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FXavier_Carroll_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '19', name: 'Hunter' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FHunter_Wilson_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '20', name: 'Owen', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FOwen_Lagerwey_2025_Headshot.png&width=100&height=100&type=webp" },
  { id: '21', name: 'Lenny' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FLennart_Granzow_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '22', name: 'Jaxon', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FJackson_Minneci_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '24', name: 'Poul' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FPaul_Ngoie_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '27', name: 'David' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FDavid_Liboyi_2025_Headshot.jpg&width=100&height=100&type=webp"},
  { id: '28', name: 'Dylan K', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FDylan_Kwasnik_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '29', name: 'Spijkers' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FSjoerd_Spijkers_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '30', name: 'Andrew', position:"goalkeeper", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FAndrew_Kohlberg_2025_Headshot.png&width=100&height=100&gravity=north&type=webp"},
  { id: '31', name: 'AJ' , position:"goalkeeper", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FAJ_Bengds_2025_Headshot.jpg&width=100&height=100&type=webp"},
  { id: '32', name: 'Nico' , position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FNico_Nava_2025_Headshot.jpg&width=100&height=100&type=webp"},
  { id: '33', name: 'Dylan C', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FDylan_Culbertson_2025_Headshot.jpg&width=100&height=100&type=webp"},
  { id: '34', name: 'Edvin', position:"midfield", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FEdvin_Grolimund_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '35', name: 'Eli' , position:"forward", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FEli_Berry_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '36', name: 'Logan' , position:"defender", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FLogan_Smith_2025_Headshot.png&width=100&height=100&type=webp"},
  { id: '37', name: 'Rodrigo', position:"forward", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FRodrigo_Mendes_2025_Headshot.jpg&width=100&height=100&type=webp"},
  { id: '40', name: 'Lucca', position:"goalkeeper", img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2F2025%2F8%2F5%2FLucca_Barros_2025_Headshot.jpg&width=100&height=100&type=webp"},
];

export default function HomeScreen() {
  const [selectedPosition, setSelectedPosition] = React.useState<Position>('forward');
  const [selectedPlayers, setSelectedPlayers] = React.useState<Set<string>>(new Set());
  
  // Use global context
  const { setSelectedPlayers: setContextPlayers } = useAppContext();
  const router = useRouter();

  // Sync local state with context whenever it changes
  useEffect(() => {
    setContextPlayers(selectedPlayers);
  }, [selectedPlayers, setContextPlayers]);

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
    // Store the selected data in context
    setContextPlayers(selectedPlayers);
    
    console.log('Selected Position:', selectedPosition);
    console.log('Selected Players:', Array.from(selectedPlayers));
    
    // Navigate to next screen - data is already in context
    router.push('/gps-data' as any);
  };

  const playersToDisplay = SAMPLE_PLAYERS.filter((player) => {
    if (selectedPosition === 'All') {
      return true;
    }
    if (selectedPosition === 'forward') {
      return player.position === 'forward';
    }
    if (selectedPosition === 'midfield') {
      return player.position === 'midfield';
    }
    if (selectedPosition === 'defender') {
      return player.position === 'defender';
    }
    return player.position === 'goalkeeper';
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SegmentedButtons
          value={selectedPosition}
          onValueChange={(value) => setSelectedPosition(value as Position)}
          buttons={[
            { value: 'All', label: 'All' },
            { value: 'forward', label: 'Forward' },
            { value: 'midfield', label: 'Midfielder' },
            { value: 'defender', label: 'Defender' },
            { value: 'goalkeeper', label: 'Goalkeeper' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <ScrollView style={styles.playerList} contentContainerStyle={styles.playerListContent}>
        {playersToDisplay.map((player) => (
          <List.Item
            key={player.id}
            title={
              <View style={styles.titleContainer}>
                <Text style={styles.playerName}> #{player.id} {player.name}</Text>
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
              <Avatar.Image 
                source={{ uri: player.img_url}} 
                size={50}
                style={{ backgroundColor: 'transparent' }}
              />
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
    backgroundColor: '#007AFF',
  },
  nextButtonContent: {
    paddingVertical: 8,
  },
});


