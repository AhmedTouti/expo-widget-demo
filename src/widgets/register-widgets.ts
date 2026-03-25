import { Platform } from 'react-native';

import { flattenActivitiesForWidget, WIDGET_ACTIVITIES } from './mock-data';

// Registers the widget layout and pushes initial data on iOS app launch
export function registerWidgets() {
  if (Platform.OS !== 'ios') return;

  const widget = require('./recent-activity-widget').default;
  widget.updateSnapshot(flattenActivitiesForWidget(WIDGET_ACTIVITIES));
}
