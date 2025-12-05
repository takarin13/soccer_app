// place to store all global variables:
import { useAppContext } from '@/context/AppContext';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GpsStats {
  player_id: number;
  game_id: number;
  player_name: string;
  game_name: string;
  distance: number;
  sprint_distance: number;
  num_of_sprints: number;
  acc: number;
  dec: number;
}
const API_URL = 'https://script.google.com/macros/s/AKfycbzwP5Ac7fWHUvNIHGGidUrl1G-f026zeQzTtoVd-cSW5siXKhxP1D072O3jxuA08eUC/exec'

export default function GPSScreen() {
  const [mode, setMode] = useState<"players" | "trend">("players");
  const [gpsToDisplay, setGpsToDisplay] = useState<Record<string, GpsStats[]>>({});
  const [groups, setGroups] = useState<Record<number, any[]>>({});


  // Access the context to get selected teams and other data
  const { appData, getSelectedTeamsArray, getSelectedPlayersArray } = useAppContext();

  // Memoize arrays to prevent infinite loops - serialize Sets to detect actual changes
  // This ensures arrays only recreate when Set contents actually change, not just references
  const selectedTeamsArray = useMemo(() => {
    return getSelectedTeamsArray();
  }, [JSON.stringify([...appData.selectedTeams].sort())]);
  
  const selectedPlayersArray = useMemo(() => {
    return getSelectedPlayersArray();
  }, [JSON.stringify([...appData.selectedPlayers].sort())]);

const getGPSData = async () => {

    // 1. Get the sheet names from the selected teams
    const sheetNames = selectedTeamsArray.map(team => team.name);
    console.log('sheetNames', sheetNames);

    // 2. Query all GPS data tabs together and create a dictionary:
    const gpsDataBySheet: Record<string, GpsStats[]> = {};
    
    await Promise.all(sheetNames.map(async (sheetName) => {
        const response = await fetch(
            `${API_URL}?sheet=${sheetName}`
        );
        const data: GpsStats[] = await response.json();
        
        // Filter data for this sheet based on selected teams and players
        const gameIds = selectedTeamsArray.map(team => team.id);
        const filteredData = data.filter(item => {
            return gameIds.includes(item.game_id) &&
                selectedPlayersArray.includes(item.player_id);
        });
        
        // Store filtered data by sheet name
        gpsDataBySheet[sheetName] = filteredData;
    }));
    
    console.log('gpsDataBySheet', gpsDataBySheet);
    setGpsToDisplay(gpsDataBySheet);
    // Groups will be recalculated by the useEffect when gpsToDisplay changes
}

   useEffect(() => {
    console.log('Getting GPS data!!!!');
    getGPSData();
  }, [selectedTeamsArray, selectedPlayersArray]); // Re-run when selections change
  
  // Recalculate groups when mode or gpsToDisplay changes
  useEffect(() => {
    // Flatten all GPS data from all sheets into a single array
    const allGpsData = Object.values(gpsToDisplay).flat();
    if (allGpsData.length === 0) return;
    
    if (mode === "players") {
      byGame(allGpsData);
    } else {
      byPlayer(allGpsData);
    }
  }, [mode, gpsToDisplay]);

  // GROUP BY GAME
  const byGame = (gpsToDisplay: GpsStats[]) => {
    console.log('byGame triggered', gpsToDisplay);
    const _groups: Record<number, any[]> = {};
    for (const item of gpsToDisplay) {
      if (!_groups[item.game_id]) {
        _groups[item.game_id] = [];
      }
      _groups[item.game_id].push(item);
    }
    console.log('groups', _groups);
    setGroups(_groups);
  }

  const byPlayer = (gpsToDisplay: GpsStats[]) => {
    console.log('byPlayer triggered', gpsToDisplay);
    const _groups: Record<number, any[]> = {};
    for (const item of gpsToDisplay) {
      if (!_groups[item.player_id]) {
        _groups[item.player_id] = [];
      }
      _groups[item.player_id].push(item);
    }
    console.log('groups', _groups);
    setGroups(_groups);
  }
  


//     for (const item of gpsToDisplay) {
//       if (!groups[item.game_id]) groups[item.game_id] = [];
//       groups[item.game_id].push(item);
//     }
//   }
// //   const byGame = useMemo(() => {
//     console.log('byGame triggered', gpsToDisplay);
//     const groups: Record<string, any[]> = {};
//     for (const item of gpsToDisplay) {
//       if (!groups[item.game_id]) groups[item.game_id] = [];
//       groups[item.game_id].push(item);
//     }
//     return groups;
//   },  [gpsToDisplay]);

//   const byPlayer = useMemo(() => {
//     const groups: Record<string, any[]> = {};
//     for (const item of gpsToDisplay) {
//       if (!groups[item.player_id]) groups[item.player_id] = [];
//       groups[item.player_id].push(item);
//     }
//     setGroups(groups);
//     return groups;
//   }, [gpsToDisplay]);

  console.log('groups', groups);
  console.log('gpsToDisplay', gpsToDisplay);
  console.log('groups', groups);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>GPS Comparison</Text>

      {/* MODE TOGGLE */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, mode === "players" && styles.activeToggle]}
          onPress={() => setMode("players")}
        >
          <Text style={styles.toggleText}>Compare Players</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, mode === "trend" && styles.activeToggle]}
          onPress={() => setMode("trend")}
        >
          <Text style={styles.toggleText}>Player Trend</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {mode === "players" ? (
          // -------- MULTI-PLAYER COMPARISON --------
          Object.keys(groups).map(gameId => {
            const gameIdNum = Number(gameId);
            return (
            <View key={gameId} style={styles.gameCard}>
              <Text style={styles.gameTitle}>
                Game {gameId} – {groups[gameIdNum][0].game_name}
              </Text>

              <View style={styles.playersRow}>
                {groups[gameIdNum].map(player => (
                  <View key={player.player_id} style={styles.playerCard}>
                    <Text style={styles.playerName}>{player.player_name}</Text>
                    <Text style={styles.stat}>Distance: {player.distance}km</Text>
                    <Text style={styles.stat}>Sprint Dist: {player.sprint_distance}m</Text>
                    <Text style={styles.stat}>Sprints: {player.num_of_sprints}</Text>
                    <Text style={styles.stat}>Acc: {player.acc}</Text>
                    <Text style={styles.stat}>Dec: {player.dec}</Text>
                  </View>
                ))}
              </View>
            </View>
            );
          })
        ) : (
          // -------- PLAYER TREND VIEW --------
          Object.keys(groups).map(playerId => {
            const playerIdNum = Number(playerId);
            return (
            <View key={playerId} style={styles.gameCard}>
              <Text style={styles.gameTitle}>
                {groups[playerIdNum][0].player_name}'s Trend
              </Text>

              {groups[playerIdNum].map(game => (
                <View key={game.game_id} style={styles.playerCard}>
                  <Text style={styles.playerName}>
                    Game {game.game_id} – {game.game_name} {game.img_url}
                  </Text>
                  <Text style={styles.stat}>Distance: {game.distance}km</Text>
                  <Text style={styles.stat}>Sprint Dist: {game.sprint_distance}m</Text>
                  <Text style={styles.stat}>Sprints: {game.num_of_sprints}</Text>
                  <Text style={styles.stat}>Acc: {game.acc}</Text>
                  <Text style={styles.stat}>Dec: {game.dec}</Text>
                </View>
              ))}
            </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F7F9FC',   // clean professional background
      padding: 16,
    },

    header: {
      color: '#1C1C1E',             // dark professional text
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 20,
      alignSelf: 'center',
      fontFamily: 'Inter',
    },

    gameCard: {
      backgroundColor: '#FFFFFF',
      marginBottom: 20,
      padding: 18,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#E2E6EE',       // light neutral border
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },

    gameTitle: {
      color: '#4A6CF7',             // professional accent blue
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 14,
      fontFamily: 'Inter',
    },

    playersRow: {
      flexDirection: 'row',
      gap: 14,
    },

    playerCard: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 16,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: '#E2E6EE',
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },

    playerName: {
      color: '#1C1C1E',
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 10,
      fontFamily: 'Inter',
    },

    stat: {
      color: '#6C7380',             // muted pro gray
      fontSize: 14,
      marginBottom: 6,
      fontFamily: 'Inter',
    },
    toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  toggleBtn: {
    backgroundColor: "#2a2d31",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  activeToggle: {
    backgroundColor: "#7db4ff",
  },
  toggleText: {
    color: "#fff",
    fontWeight: "600",
  },
});

