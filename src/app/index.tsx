import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useWidgetSync } from '../widgets/use-widget-sync';

// Home screen — introduces the demo and tells users how to add the widget
export default function HomeScreen() {
  useWidgetSync();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Widgets Demo</Text>
      <Text style={styles.author}>by Ahmed Touti</Text>
      <Text style={styles.subtitle}>
        A demo showing how to build native home screen widgets for iOS and
        Android using Expo.
      </Text>
      <Text style={styles.hint}>
        Long-press your home screen → add the "Recent Activity" widget.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fafafa',
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 },
  author: { fontSize: 15, color: '#3b82f6', fontWeight: '600', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#64748b', textAlign: 'center', marginBottom: 12 },
  hint: { fontSize: 14, color: '#94a3b8', textAlign: 'center' },
});
