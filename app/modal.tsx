import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  const { width, height } = useWindowDimensions();
  const isLargeScreen = width > 768;

  return (
    <View style={[styles.container, { paddingHorizontal: isLargeScreen ? 40 : 20 }]}>
      <Text style={[styles.title, isLargeScreen && styles.largeTitle]}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Ajuste da status bar para iOS */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  largeTitle: {
    fontSize: 24,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
