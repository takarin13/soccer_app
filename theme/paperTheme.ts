import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper';

// Customize the theme colors
const customColors = {
  primary: '#ffd33d',        // Your yellow accent color
  onPrimary: '#25292e',      // Text on primary (dark)
  primaryContainer: '#ffd33d',
  onPrimaryContainer: '#25292e',
  secondary: '#666',
  onSecondary: '#fff',
  secondaryContainer: '#444',
  onSecondaryContainer: '#fff',
  tertiary: '#007AFF',
  onTertiary: '#fff',
  error: '#ff4444',
  onError: '#fff',
  errorContainer: '#ff4444',
  onErrorContainer: '#fff',
  background: '#fff',        // Default background
  onBackground: '#25292e',   // Text on background
  surface: '#fff',           // Surface color (for List.Item, Card, etc.)
  onSurface: '#25292e',      // Text on surface
  surfaceVariant: '#f5f5f5', // Variant surface
  onSurfaceVariant: '#666',
  outline: '#e0e0e0',        // Borders
  outlineVariant: '#e0e0e0',
  shadow: '#000',
  scrim: '#000',
  inverseSurface: '#25292e',
  inverseOnSurface: '#fff',
  inversePrimary: '#ffd33d',
  elevation: {
    level0: 'transparent',
    level1: '#f5f5f5',
    level2: '#f0f0f0',
    level3: '#ebebeb',
    level4: '#e5e5e5',
    level5: '#e0e0e0',
  },
};

// Configure fonts (optional - customize if needed)
const fontConfig = {
  displayLarge: {
    fontFamily: 'System',
    fontSize: 57,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 64,
  },
  // Add more font configurations as needed
};

// Create custom light theme
export const customLightTheme = {
  ...MD3LightTheme,
  colors: customColors,
  fonts: configureFonts({ config: fontConfig }),
};

// Create custom dark theme (optional)
export const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#ffd33d',
    background: '#25292e',
    surface: '#333',
    onSurface: '#fff',
    // Customize other dark theme colors as needed
  },
  fonts: configureFonts({ config: fontConfig }),
};

// Export the theme you want to use
export default customLightTheme;

