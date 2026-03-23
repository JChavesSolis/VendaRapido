import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { AuthProvider, useAuth } from '~utils/tokenHandling';
import AppNavigator from '~navigators/AppNavigator';


const RootApp = () => {
  const { isDarkMode, theme } = useAuth();

  return (
    <>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.surface}
      />
      <AppNavigator />
    </>
  );
};

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootApp />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;