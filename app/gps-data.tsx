// place to store all global variables:
import { useAppContext } from '@/context/AppContext';
import { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface GpsStats {
  player_id: string;
  game_id: string;
  player_name: string;
  game_name: string;
  distance: number;
  sprint_distance: number;
  num_of_sprints: number;
  acc: number;
  dec: number;
}

const SAMPLE_GPS: GpsStats[] = [
  {player_id: '3', game_id: '1', player_name: 'Conrad', game_name: 'Howard' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '2', player_name: 'Conrad', game_name: 'Georgia State' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '3', player_name: 'Conrad', game_name: 'Queens' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '4', player_name: 'Conrad', game_name: 'Bellamine' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '5', player_name: 'Conrad', game_name: 'Wafford' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '6', player_name: 'Conrad', game_name: 'ETSU' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '7', player_name: 'Conrad', game_name: 'Upstate' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '8', player_name: 'Conrad', game_name: 'California' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '9', player_name: 'Conrad', game_name: 'Radford' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '10', player_name: 'Conrad', game_name: 'Highpoint' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '11', player_name: 'Conrad', game_name: 'Longwood' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '12', player_name: 'Conrad', game_name: 'Presbyterian' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '13', player_name: 'Conrad', game_name: 'furman' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '14', player_name: 'Conrad', game_name: 'Winthrop' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '3', game_id: '15', player_name: 'Conrad', game_name: 'Gardner-Webb' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '1', player_name: 'Woody', game_name: 'Howard' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '2', player_name: 'Woody', game_name: 'Georgia State' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '3', player_name: 'Woody', game_name: 'Queens' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '4', player_name: 'Woody', game_name: 'Bellamine' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '5', player_name: 'Woody', game_name: 'Wafford' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '6', player_name: 'Woody', game_name: 'ETSU' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '7', player_name: 'Woody', game_name: 'Upstate' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '8', player_name: 'Woody', game_name: 'California' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '9', player_name: 'Woody', game_name: 'Radford' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '10', player_name: 'Woody', game_name: 'Highpoint' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '11', player_name: 'Woody', game_name: 'Longwood' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '12', player_name: 'Woody', game_name: 'Presbyterian' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '13', player_name: 'Woody', game_name: 'furman' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '14', player_name: 'Woody', game_name: 'Winthrop' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '10', game_id: '15', player_name: 'Woody', game_name: 'Gardner-Webb' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '1', player_name: 'Rinta', game_name: 'Howard' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '2', player_name: 'Rinta', game_name: 'Georgia State' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '3', player_name: 'Rinta', game_name: 'Queens' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '4', player_name: 'Rinta', game_name: 'Bellamine' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '5', player_name: 'Rinta', game_name: 'Wafford' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '6', player_name: 'Rinta', game_name: 'ETSU' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '7', player_name: 'Rinta', game_name: 'Upstate' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '8', player_name: 'Rinta', game_name: 'California' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '9', player_name: 'Rinta', game_name: 'Radford' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '10', player_name: 'Rinta', game_name: 'Highpoint' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '11', player_name: 'Rinta', game_name: 'Longwood' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '12', player_name: 'Rinta', game_name: 'Presbyterian' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '13', player_name: 'Rinta', game_name: 'furman' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '14', player_name: 'Rinta', game_name: 'Winthrop' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '13', game_id: '15', player_name: 'Rinta', game_name: 'Gardner-Webb' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '1', player_name: 'Rodrigo', game_name: 'Howard' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '2', player_name: 'Rodrigo', game_name: 'Georgia State' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '3', player_name: 'Rodrigo', game_name: 'Queens' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '4', player_name: 'Rodrigo', game_name: 'Bellamine' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '5', player_name: 'Rodrigo', game_name: 'Wafford' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '6', player_name: 'Rodrigo', game_name: 'ETSU' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '7', player_name: 'Rodrigo', game_name: 'Upstate' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '8', player_name: 'Rodrigo', game_name: 'California' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '9', player_name: 'Rodrigo', game_name: 'Radford' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '10', player_name: 'Rodrigo', game_name: 'Highpoint' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '11', player_name: 'Rodrigo', game_name: 'Longwood' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '12', player_name: 'Rodrigo', game_name: 'Presbyterian' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '13', player_name: 'Rodrigo', game_name: 'furman' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '14', player_name: 'Rodrigo', game_name: 'Winthrop' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
  {player_id: '37', game_id: '15', player_name: 'Rodrigo', game_name: 'Gardner-Webb' , distance: 13,  sprint_distance: 800, num_of_sprints: 80, acc: 100, dec: 100},
];

export default function GPSScreen() {
  const [mode, setMode] = useState<"players" | "trend">("players");
  // Access the context to get selected teams and other data
  const { appData, getSelectedTeamsArray, getSelectedPlayersArray } = useAppContext();

  // Get selected teams as an array (easier to work with)
  const selectedTeamsArray = getSelectedTeamsArray();
  
  // Or access the Set directly from appData
  const selectedTeamsSet = appData.selectedTeams;
  
  // Also access other data if needed
  const selectedPlayersArray = getSelectedPlayersArray();

  const gpsToDisplay = useMemo(() => {
    return SAMPLE_GPS.filter(item =>
      selectedTeamsArray.includes(item.game_id) &&
      selectedPlayersArray.includes(item.player_id)
    );
  }, [selectedTeamsArray, selectedPlayersArray]);

  // GROUP BY GAME
  const byGame = useMemo(() => {
    const groups: Record<string, any[]> = {};
    for (const item of gpsToDisplay) {
      if (!groups[item.game_id]) groups[item.game_id] = [];
      groups[item.game_id].push(item);
    }
    return groups;
  },  [gpsToDisplay]);

  const byPlayer = useMemo(() => {
    const groups: Record<string, any[]> = {};
    for (const item of gpsToDisplay) {
      if (!groups[item.player_id]) groups[item.player_id] = [];
      groups[item.player_id].push(item);
    }
    return groups;
  }, [gpsToDisplay]);

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
          Object.keys(byGame).map(gameId => (
            <View key={gameId} style={styles.gameCard}>
              <Text style={styles.gameTitle}>
                Game {gameId} – {byGame[gameId][0].game_name}
              </Text>

              <View style={styles.playersRow}>
                {byGame[gameId].map(player => (
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
          ))
        ) : (
          // -------- PLAYER TREND VIEW --------
          Object.keys(byPlayer).map(playerId => (
            <View key={playerId} style={styles.gameCard}>
              <Text style={styles.gameTitle}>
                {byPlayer[playerId][0].player_name}'s Trend
              </Text>

              {byPlayer[playerId].map(game => (
                <View key={game.game_id} style={styles.playerCard}>
                  <Text style={styles.playerName}>
                    Game {game.game_id} – {game.game_name}
                  </Text>
                  <Text style={styles.stat}>Distance: {game.distance}km</Text>
                  <Text style={styles.stat}>Sprint Dist: {game.sprint_distance}m</Text>
                  <Text style={styles.stat}>Sprints: {game.num_of_sprints}</Text>
                  <Text style={styles.stat}>Acc: {game.acc}</Text>
                  <Text style={styles.stat}>Dec: {game.dec}</Text>
                </View>
              ))}
            </View>
          ))
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

