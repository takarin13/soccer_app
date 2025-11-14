import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ChooseTypeScreen() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Type of Data</Text>
        {/* Players */}
        <Pressable style={styles.button} onPress={() => handleNavigation('/players')}
          >
            <Text style={styles.buttonText}>Players</Text>
          </Pressable>

          {/*Film */}
        <Pressable style={styles.button} onPress={() => handleNavigation('/game-film')}
          >
            <Text style={styles.buttonText}>Film</Text>
          </Pressable>

        {/*Film */}
        <Pressable style={styles.button} onPress={() => handleNavigation('https://uncabulldogs.com/sports/mens-soccer/stats/2025/furman/boxscore/10308')}
        >
        <Text style={styles.buttonText}>Team Stats</Text>
        </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});


