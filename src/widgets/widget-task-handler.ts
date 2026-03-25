import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import * as React from 'react';
import { Platform } from 'react-native';

import { WIDGET_ACTIVITIES } from './mock-data';

// Handles Android widget lifecycle events (add, update, resize)
async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const { widgetAction, renderWidget } = props;

  if (widgetAction === 'WIDGET_DELETED') return;

  const { RecentActivityWidget } = require('./recent-activity-widget.android');
  renderWidget(
    React.createElement(RecentActivityWidget, {
      activities: WIDGET_ACTIVITIES,
    }),
  );
}

// Must be called at module level before app mounts
export function registerAndroidWidgetTaskHandler() {
  if (Platform.OS !== 'android') return;

  const { registerWidgetTaskHandler } = require('react-native-android-widget');
  registerWidgetTaskHandler(widgetTaskHandler);
}
