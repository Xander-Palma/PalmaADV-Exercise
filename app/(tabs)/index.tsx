import { useEffect, useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function HomeScreen() {
   

  return (
    <View
      style={styles.container}
      >
      <Text
        style={styles.title}
      >
        Xander Palma
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 30,
    fontFamily: "sans-serif",
    color: '#000000'
  }
});
