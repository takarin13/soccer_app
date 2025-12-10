import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@/context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      {/* Redirect root (/) → /home */}
      <Redirect href="/home" />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="light" />
    </AppProvider>
  );
}


