import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>    
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />      
        <Stack.Screen name="+not-found" />
        <Stack.Screen 
        name="screens/login" 
        options={{ title: "Login Screen" }} 
      />
       <Stack.Screen 
        name="screens/useeffect" 
        options={{ title: "useEffect Screen" }} 
      />
       <Stack.Screen 
        name="screens/usestate" 
        options={{ title: "useState Screen" }} 
      />
       <Stack.Screen 
        name="screens/hooks" 
        options={{ title: "Hooks Screen" }} 
      />
       <Stack.Screen 
        name="screens/register" 
        options={{ title: "Register Screen" }} 
      />
       <Stack.Screen 
        name="screens/crud" 
        options={{ title: "useContext and useReducer screen" }} 
      />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}
