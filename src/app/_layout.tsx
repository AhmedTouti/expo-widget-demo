import { Stack } from 'expo-router';
import * as React from 'react';

import { registerWidgets } from '../widgets/register-widgets';

// Push initial data to the iOS widget on app launch
registerWidgets();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Expo Widget Demo' }} />
    </Stack>
  );
}
