import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppShell } from './src/navigation/AppShell';
import { AppDataProvider } from './src/context/AppDataContext';
import { colors } from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.headerBackground} />
      <AppDataProvider>
        <AppShell />
      </AppDataProvider>
    </SafeAreaProvider>
  );
}

export default App;
