import { Link, Stack } from 'expo-router';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function NotFoundScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={[styles.title, isLargeScreen && styles.largeTitle]}>
          Esta página não existe.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={[styles.linkText, isLargeScreen && styles.largeLinkText]}>
            Voltar para a página inicial
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  largeTitle: {
    fontSize: 24,
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: '#2e78b7',
    fontWeight: '600',
  },
  largeLinkText: {
    fontSize: 18,
  },
});
