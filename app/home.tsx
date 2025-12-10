import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  form: {
    width: "80%",
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#9BB9FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
  },
});
