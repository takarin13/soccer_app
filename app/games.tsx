import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { Checkbox } from 'antd';

export default function GameScreen() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const onChange = e => {
  console.log(`checked = ${e.target.checked}`);
  };

  const App = () => (
    <Checkbox onChange={onChange}>Howard</Checkbox>;
    <Checkbox onChange={onChange}>Georgia State</Checkbox>;
    <Checkbox onChange={onChange}>Queens</Checkbox>;
    <Checkbox onChange={onChange}>Bellarmine</Checkbox>;
    <Checkbox onChange={onChange}>Wofford</Checkbox>;
    <Checkbox onChange={onChange}>ETSU</Checkbox>;
    <Checkbox onChange={onChange}>USC Upstae</Checkbox>;
    <Checkbox onChange={onChange}>California</Checkbox>;
    <Checkbox onChange={onChange}>Radford</Checkbox>;
    <Checkbox onChange={onChange}>High Point</Checkbox>;
    <Checkbox onChange={onChange}>Longwood</Checkbox>;
    <Checkbox onChange={onChange}>Presbyterian</Checkbox>;
    <Checkbox onChange={onChange}>Furman</Checkbox>;
    <Checkbox onChange={onChange}>Winthrop</Checkbox>;
    <Checkbox onChange={onChange}>Gardner-Webb</Checkbox>;

    <Checkbox onChange={onChange}>USC Upstate -Big South tournament</Checkbox>;
  )
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
