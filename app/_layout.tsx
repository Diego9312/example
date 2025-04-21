// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import { useWindowDimensions } from 'react-native';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/components/useColorScheme';

// export {
//   // Captura erros na árvore de navegação
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: '(tabs)',
// };

// // Previne que a splash screen desapareça antes do carregamento dos assets
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   useEffect(() => {
//     if (error) {
//       console.error('Erro ao carregar fontes:', error);
//     }
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) return null;

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();
//   const { width } = useWindowDimensions();
//   const isLargeScreen = width > 768;

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: !isLargeScreen }}>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }

