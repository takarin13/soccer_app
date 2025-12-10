import { useAppContext } from "@/context/AppContext";
import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
  Button
} from "react-native";

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
  // optional any other fields
  [key: string]: any;
}

const API_URL =
  "https://script.google.com/macros/s/AKfycbzwP5Ac7fWHUvNIHGGidUrl1G-f026zeQzTtoVd-cSW5siXKhxP1D072O3jxuA08eUC/exec";

export default function GPSScreen() {
  const [mode, setMode] = useState<"players" | "trend">("players");
  const [gpsToDisplay, setGpsToDisplay] = useState<Record<string, GpsStats[]>>(
    {}
  );
  const [groups, setGroups] = useState<Record<string, GpsStats[]>>({});
  const [loading, setLoading] = useState(false);

  const { appData, getSelectedTeamsArray, getSelectedPlayersArray } =
    useAppContext();


  // Selected arrays memoized so dependencies only change when actual set contents change
  const selectedTeamsArray = useMemo(() => getSelectedTeamsArray(), [
    JSON.stringify([...appData.selectedTeams].sort()),
  ]);
  const selectedPlayersArray = useMemo(() => getSelectedPlayersArray(), [
    JSON.stringify([...appData.selectedPlayers].sort()),
  ]);

  // Flatten gpsToDisplay into an array; always stable reference when data hasn't changed
  const flattenedGps = useMemo(() => {
    return Object.values(gpsToDisplay).flat();
  }, [gpsToDisplay]);

  // Fetch GPS data (reads selected teams' sheets) and replace gpsToDisplay completely
  const getGPSData = async () => {
    setLoading(true);
    try {
      const sheetNames = selectedTeamsArray.map((t: any) => t.name);
      const gameIds = selectedTeamsArray.map((t: any) => t.id);
      const result: Record<string, GpsStats[]> = {};

      await Promise.all(
        sheetNames.map(async (sheetName: string) => {
          try {
            const res = await fetch(`${API_URL}?sheet=${encodeURIComponent(sheetName)}`);
            const data: GpsStats[] = await res.json();

            // Filter by actual game ids and selected players (ensure numeric comparison)
            const filtered = data.filter((item) => {
              const gameMatch = gameIds.includes(Number(item.game_id));
              const playerMatch = selectedPlayersArray.includes(Number(item.player_id));
              return gameMatch && playerMatch;
            });

            // Always store an array (even if empty)
            result[String(sheetName)] = filtered;
          } catch (e) {
            console.warn("Failed fetching sheet", sheetName, e);
            result[String(sheetName)] = [];
          }
        })
      );

      // Replace state atomically
      setGpsToDisplay(result);
    } catch (err) {
      console.error("getGPSData error", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when selected teams or players change
  useEffect(() => {
    // If no teams or players selected, clear data
    if (!selectedTeamsArray.length || !selectedPlayersArray.length) {
      setGpsToDisplay({});
      setGroups({});
      return;
    }
    getGPSData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(selectedTeamsArray), JSON.stringify(selectedPlayersArray)]);

  // Rebuild groups fresh whenever mode or flattenedGps changes
  useEffect(() => {
    if (!flattenedGps || flattenedGps.length === 0) {
      setGroups({});
      return;
    }

    if (mode === "players") {
      const byGame: Record<string, GpsStats[]> = {};
      for (const item of flattenedGps) {
        const gid = String(item.game_id);
        if (!byGame[gid]) byGame[gid] = [];
        byGame[gid].push(item);
      }
      // Sort player lists for stable display (optional)
      for (const k of Object.keys(byGame)) {
        byGame[k].sort((a, b) => a.player_id - b.player_id);
      }
      setGroups(byGame);
    } else {
      const byPlayer: Record<string, GpsStats[]> = {};
      for (const item of flattenedGps) {
        const pid = String(item.player_id);
        if (!byPlayer[pid]) byPlayer[pid] = [];
        byPlayer[pid].push(item);
      }
      // Sort games per player for stable display
      for (const k of Object.keys(byPlayer)) {
        byPlayer[k].sort((a, b) => a.game_id - b.game_id);
      }
      setGroups(byPlayer);
    }
  }, [mode, flattenedGps]);

  // Make toggles clear groups first to avoid any flicker of stale view
  const handleSetMode = (m: "players" | "trend") => {
    if (mode === m) return;
    setGroups({}); // clear immediately
    setMode(m);
  };

  // UI render helpers: safe access to group arrays
  const safeGroup = (key: string) => groups[key] ?? [];

  const findStatsUrlForGame = (gameId: number) => {
        const team = selectedTeamsArray.find((t: any) => t.id === gameId);
         return team?.stats_url || null;
      };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>GPS Comparison</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, mode === "players" && styles.activeToggle]}
          onPress={() => handleSetMode("players")}
        >
          <Text style={styles.toggleText}>Compare Players</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, mode === "trend" && styles.activeToggle]}
          onPress={() => handleSetMode("trend")}
        >
          <Text style={styles.toggleText}>Player Trend</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 24 }} />
      ) : (
        <ScrollView>
          {Object.keys(groups).length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No data to display.
            </Text>
          ) : mode === "players" ? (
            // MULTI-PLAYER COMPARISON (grouped by game)
            Object.keys(groups).map((gameId) => {
              const arr = safeGroup(gameId);
              if (arr.length === 0) return null;
              const first = arr[0];
              return (
                <View key={gameId} style={styles.gameCard}>
                  <Text style={styles.gameTitle}>
                    Game {gameId} – {first.game_name}
                  </Text>

                  <TouchableOpacity
                    style={styles.statsButton}
                    onPress={() => {
                      const url = findStatsUrlForGame(Number(gameId));
                      if (url) Linking.openURL(url);
                      else console.warn("No stats_url for this game");
                    }}
                  >
                    <Text style={styles.statsButtonText}>Open Stats</Text>
                </TouchableOpacity>


                  <View style={styles.playersRow}>
                    {arr.map((player) => (
                      <View key={String(player.player_id) + "_" + String(player.game_id)} style={styles.playerCard}>
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
            // PLAYER TREND (grouped by player)
            Object.keys(groups).map((playerId) => {
              const arr = safeGroup(playerId);
              if (arr.length === 0) return null;
              const first = arr[0];
              return (
                <View key={playerId} style={styles.gameCard}>
                  <Text style={styles.gameTitle}>
                    {first.player_name}'s Trend
                  </Text>

                  {arr.map((game) => (
                    <View key={String(game.game_id) + "_" + String(game.player_id)} style={styles.playerCard}>
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
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 16,
  },
  header: {
    color: "#1C1C1E",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    alignSelf: "center",
    fontFamily: "Inter",
  },
  gameCard: {
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E6EE",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  gameTitle: {
    color: "#4A6CF7",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    fontFamily: "Inter",
  },
  playersRow: {
    flexDirection: "row",
    gap: 14,
  },
  playerCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E6EE",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginRight: 8,
  },
  playerName: {
    color: "#1C1C1E",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: "Inter",
  },
  stat: {
    color: "#6C7380",
    fontSize: 14,
    marginBottom: 6,
    fontFamily: "Inter",
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
  statsButton: {
  backgroundColor: "#4A6CF7",
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 10,
  alignSelf: "flex-start",
  marginBottom: 12,
},
statsButtonText: {
  color: "#fff",
  fontWeight: "700",
  fontSize: 14,
},

});