import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';

import { flattenActivitiesForWidget, WIDGET_ACTIVITIES } from './mock-data';

// Syncs widget snapshot on mount and exposes manual sync for pull-to-refresh
export function useWidgetSync() {
  const syncWidget = useCallback(() => {
    if (Platform.OS === 'ios') {
      const widget = require('./recent-activity-widget').default;
      widget.updateSnapshot(flattenActivitiesForWidget(WIDGET_ACTIVITIES));
      widget.reload();
    }
    else if (Platform.OS === 'android') {
      try {
        const { requestWidgetUpdate } = require('react-native-android-widget');
        const { RecentActivityWidget } = require('./recent-activity-widget.android');
        requestWidgetUpdate({
          widgetName: 'RecentActivity',
          renderWidget: () =>
            React.createElement(RecentActivityWidget, {
              activities: WIDGET_ACTIVITIES,
            }),
        });
      } catch (e) {
        // Native module not available (e.g. running in Expo Go)
        console.warn('Widget sync skipped:', e);
      }
    }
  }, []);

  useEffect(() => {
    syncWidget();
  }, [syncWidget]);

  return { syncWidget };
}
