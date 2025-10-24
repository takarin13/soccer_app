import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ChooseTypeScreen() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>GPS Data</Text>
      return (
      <View style={styles.container}>
        {/* Players */}
        <Pressable style={styles.menuItem} onPress={() => handleNavigation('/players')}
          >
            <Text style={styles.menuItemText}>Players</Text>
          </Pressable>

          {/*Film */}
        <Pressable style={styles.menuItem} onPress={() => handleNavigation('/game-film')}
          >
            <Text style={styles.menuItemText}>Film</Text>
          </Pressable>

        {/*Film */}
        <Pressable style={styles.menuItem} onPress={() => handleNavigation('https://uncabulldogs.com/sports/mens-soccer/stats/2025/furman/boxscore/10308')}
        >
        <Text style={styles.menuItemText}>Team Stats</Text>
        </Pressable>
      </View>
  );
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
    menuContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
      textAlign: 'center',
    },
    menuItem: {
      backgroundColor: '#333',
      borderRadius: 12,
      marginBottom: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#444',
    },
    menuItemPressed: {
      backgroundColor: '#444',
      borderColor: '#ffd33d',
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    menuIcon: {
      marginRight: 16,
    },
    menuItemText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '500',
    },
  text: {
    color: '#fff',
  }
  });
  

