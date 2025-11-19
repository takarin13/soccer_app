import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default function HomeScreen() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleNavigation = () => {
    const isEmailValid = email.endsWith("@unca.edu");
    const isPasswordValid = password === "uncamsoccer13";

    if (isEmailValid && isPasswordValid) {
      setError("");
      router.push("/games");
    } else {
      setError("Invalid email or password. Try again.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UNCA Men's Soccer Analysis App</Text>

      <TextInput
      style={styles.form}
      label="Email"
      value={email}
      onChangeText={setEmail}
      />

      <TextInput
      style={styles.form}
      label="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
      />

      <Pressable
        style={[
          styles.button,
          !(email.endsWith("@unca.edu") && password === "uncamsoccer13") && styles.buttonDisabled
        ]}
        onPress={handleNavigation}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
      {error !== "" && <Text style={styles.error}>{error}</Text>}
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
    marginTop: 20,
  },
  form: {
    marginVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonDisabled: {
    backgroundColor: '#9BB9FF', // lighter color when not valid
  },
  error: {
    color: 'red',
    marginTop: 12,
    fontSize: 16,
  },
});


