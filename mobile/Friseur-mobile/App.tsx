import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { DefaultTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import AuthProvider from './src/provider/AuthProvider';
import AppNavigator from './src/navigation';

export default function App() {
  const colorScheme = useColorScheme();
  console.log(colorScheme);
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const lighTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#6200ee',
      accent: '#03dac4',
      background: '#f6f6f6',
      surface: '#ffffff',
      text: '#000000',
      disabled: '#9e9e9e',
      placeholder: '#bdbdbd',
      backdrop: 'rgba(0, 0, 0, 0.5)',
    }, 
  };
  const darkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#bb86fc',
      accent: '#03dac6',
      background: '#121212',
      surface: '#1e1e1e',
      text: '#ffffff',
      disabled: '#757575',
      placeholder: '#bdbdbd',
      backdrop: 'rgba(0, 0, 0, 0.5)',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <AppNavigator/>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

//12 22:00

