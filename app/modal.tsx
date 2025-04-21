// import { View, Text, StyleSheet, useWindowDimensions, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';

// export default function ModalScreen() {
//   const { width } = useWindowDimensions();
//   const isLargeScreen = width > 768;

//   return (
//     <View style={[styles.container, { paddingHorizontal: isLargeScreen ? 40 : 20 }]}>
//       <Text style={[styles.title, isLargeScreen && styles.largeTitle]}>Modal</Text>
//       <View style={styles.separator} />
//       <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   largeTitle: {
//     fontSize: 24,
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//     backgroundColor: '#ccc',
//   },
// });