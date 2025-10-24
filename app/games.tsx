import { StyleSheet, Text, View } from 'react-native';
import NavigationMenu from '@/components/NavigationMenu';

export default function GamesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Games</Text>
      <NavigationMenu />
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
  text: {
    color: '#fff',
  },
});

