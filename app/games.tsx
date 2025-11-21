import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Checkbox, List, SegmentedButtons } from 'react-native-paper';


type Games = 'All' | 'conference' | 'none conference' | 'home' | 'away';

interface Team {
  id: string;
  name: string;
  home_or_away?: string;
  conference?: string;
  img_url?: string;
}

const SAMPLE_TEAMS: Team[] = [
  {id: '1', name: 'Howard' , home_or_away: 'home', conference: 'none conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FHoward.png&width=84&height=84&quality=100&type=webp"},
  {id: '2', name: 'Georgia State' , home_or_away: 'home', conference: 'none conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FPANTHERHEAD_LOGO_NEW.png&width=84&height=84&quality=100&type=webp"},
  {id: '3', name: 'Queens' , home_or_away: 'away', conference: 'none conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FQueensUpdated2023.png&width=84&height=84&quality=100&type=webp"},
  {id: '4', name: 'Bellamine' , home_or_away: 'home', conference: 'none conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FBellarmine_site_logo.png&width=84&height=84&quality=100&type=webp"},
  {id: '5', name: 'Wafford' , home_or_away: 'away', conference: 'none conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2Fwofford_logo_200px.png&width=84&height=84&quality=100&type=webp"},
  {id: '6', name: 'ETSU' , home_or_away: 'away', conference: 'none conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FEast-Tenn-State.png&width=84&height=84&quality=100&type=webp"},
  {id: '7', name: 'Upstate' , home_or_away: 'away', conference: 'conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FUSC_Upstate_logo.png&width=84&height=84&quality=100&type=webp"},
  {id: '8', name: 'California' , home_or_away: 'home', conference: 'none conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2Fcal_logo.png&width=84&height=84&quality=100&type=webp"},
  {id: '9', name: 'Radford' , home_or_away: 'home', conference: 'conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FRadford.png&width=84&height=84&quality=100&type=webp"},
  {id: '10', name: 'Highpoint' , home_or_away: 'home', conference: 'conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FHighpoint.png&width=84&height=84&quality=100&type=webp"},
  {id: '11', name: 'Longwood' , home_or_away: 'away', conference: 'conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FLongwood-Lancers.png&width=84&height=84&quality=100&type=webp"},
  {id: '12', name: 'Presbyterian' , home_or_away: 'home', conference: 'conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FPresbyterian.png&width=84&height=84&quality=100&type=webp"},
  {id: '13', name: 'furman' , home_or_away: 'home', conference: 'none conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FFurman.png&width=84&height=84&quality=100&type=webp"},
  {id: '14', name: 'Winthrop' , home_or_away: 'away', conference: 'conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2Fwinthrop.png&width=84&height=84&quality=100&type=webp"},
  {id: '15', name: 'Gardner-Webb' , home_or_away: 'home', conference: 'conference', img_url:"https://images.sidearmdev.com/crop?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Funcash.sidearmsports.com%2Fimages%2Flogos%2FGW_Mascot_Full_rgb.png&width=84&height=84&quality=100&type=webp"},
];

export default function HomeScreen() {
  const [selectedGames, setSelectedGames] = React.useState<Games>('conference');
  const [selectedTeams, setSelectedTeams] = React.useState<Set<string>>(new Set());
  
  // Use global context
  const { setSelectedTeams: setContextTeams } = useAppContext();
  const router = useRouter();

  // Sync local state with context whenever it changes
  useEffect(() => {
    setContextTeams(selectedTeams);
  }, [selectedTeams, setContextTeams]);

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const toggleTeam = (teamId: string) => {
    setSelectedTeams(prev => {
      const newSet = new Set(prev);
      if (newSet.has(teamId)) {
        newSet.delete(teamId);
      } else {
        newSet.add(teamId);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    // Store the selected data in context
    setContextTeams(selectedTeams);
    
    console.log('Selected Games:', selectedGames);
    console.log('Selected Teams:', Array.from(selectedTeams));
    
    // Navigate to next screen - data is already in context
    router.push('/choose-type' as any);
  };

  const teamsToDisplay = SAMPLE_TEAMS.filter((team) => {
    if (selectedGames === 'All') {
      return true;
    }
    if (selectedGames === 'conference') {
      return team.conference === 'conference';
    }
    if (selectedGames === 'none conference') {
      return team.conference === 'none conference';
    }
    return team.home_or_away === selectedGames;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SegmentedButtons
          value={selectedGames}
          onValueChange={(value) => setSelectedGames(value as Games)}
          buttons={[
            { value: 'All', label: 'All' },
            { value: 'conference', label: 'Conference' },
            { value: 'none conference', label: 'None conference' },
            { value: 'home', label: 'Home' },
            { value: 'away', label: 'Away' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <ScrollView style={styles.teamList} contentContainerStyle={styles.teamListContent}>
        {teamsToDisplay.map((Team) => (
          <List.Item
            key={Team.id}
            title={
              <View style={styles.titleContainer}>
                <Text style={styles.teamName}>{Team.name}</Text>
                {Team.home_or_away && (
                  <Text style={styles.teamHomeOrAway}>{Team.home_or_away} / {Team.conference}</Text>
                )}
              </View>
            }
            left={() => (
              <View style={styles.avatarWrapper}>
                <Checkbox
                  status={selectedTeams.has(Team.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleTeam(Team.id)}
                />
                <View style={styles.avatarContainer}>
                  <Avatar.Image 
                    source={{ uri: Team.img_url }} 
                    size={60}
                    style={{ backgroundColor: 'transparent' }}
                  />
                </View>
              </View>

            )}
            style={styles.listItem}
            titleStyle={styles.teamName}
            rippleColor="rgba(0, 0, 0, 0.1)"
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
  teamList: {
    flex: 1,
  },
  teamListContent: {
    paddingVertical: 8,
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  titleContainer:{
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamHomeOrAway: {
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
  avatarWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'transparent',
},
avatarContainer: {
  backgroundColor: '#ffffff',   // <-- White background
  borderRadius: 60,             // Must match or exceed Avatar size
  padding: 5,                    // Space between white circle and image
},
});


