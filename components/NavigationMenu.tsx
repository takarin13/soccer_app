import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

interface MenuItem {
  title: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
}


export default function NavigationMenu() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  return (
      <View style={styles.container}>
        {/* Games Link */}
        <Pressable style={styles.menuItem} onPress={() => handleNavigation('/games')}
          >
            <Text style={styles.menuItemText}>Games</Text>
          </Pressable>

          {/*GPS Data */}
        <Pressable style={styles.menuItem} onPress={() => handleNavigation('/gps-data')}
          >
            <Text style={styles.menuItemText}>GPS Data</Text>
          </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
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
});
