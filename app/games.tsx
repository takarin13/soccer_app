import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import React from 'react';

export default function GameScreen() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Games</Text>

      <Pressable
        style={styles.button}
        onPress={() => handleNavigation('/choose-type')}
      >
        <Text style={styles.buttonText}>Go to Choose Type</Text>
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
