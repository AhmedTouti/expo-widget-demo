import type { WidgetActivity } from './mock-data';
import * as React from 'react';

import { FlexWidget, SvgWidget, TextWidget } from 'react-native-android-widget';

type Props = {
  activities: WidgetActivity[];
};

// Lucide-style SVG templates keyed by SF Symbol name
// "STROKE" placeholder gets replaced with the activity's accent color at render time
const SVG_ICONS: Record<string, string> = {
  // Star icon — used for tasks / highlights
  'star.fill': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="STROKE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  // Bell icon — used for reminders / notifications
  'bell.fill': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="STROKE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  // Paper plane icon — used for messages / sent items
  'paperplane.fill': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="STROKE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
};

// Returns the SVG string with the activity's color injected into stroke
function getIconSvg(activity: WidgetActivity): string {
  const template = SVG_ICONS[activity.sfSymbol] ?? SVG_ICONS['star.fill'];
  return template.replace('STROKE', activity.iconColor);
}

// Maps accent color → soft tinted background for the icon circle
function getTintBg(hex: string): `#${string}` {
  const tints: Record<string, `#${string}`> = {
    '#3b82f6': '#dbeafe',   // blue → light blue
    '#f97316': '#ffedd5',   // orange → light orange
    '#14b8a6': '#ccfbf1',   // teal → light teal
  };
  return tints[hex] ?? '#f1f5f9';
}

// Renders a single activity row: [colored icon circle] [name + subtitle] [date]
function ActivityRow({ activity }: { activity: WidgetActivity }) {
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        width: 'match_parent',
      }}
    >
      {/* Tinted circle with SVG icon */}
      <FlexWidget
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: getTintBg(activity.iconColor),
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
        }}
      >
        <SvgWidget
          svg={getIconSvg(activity)}
          style={{ width: 16, height: 16 }}
        />
      </FlexWidget>

      {/* Activity name and subtitle */}
      <FlexWidget style={{ flexDirection: 'column', flex: 1 }}>
        <TextWidget
          text={activity.name}
          style={{ fontSize: 13, fontWeight: '600', color: '#0f172a' }}
          maxLines={1}
          truncate="END"
        />
        <TextWidget
          text={activity.subtitle}
          style={{ fontSize: 11, color: '#64748b' }}
          maxLines={1}
          truncate="END"
        />
      </FlexWidget>

      {/* Timestamp */}
      <TextWidget
        text={activity.date}
        style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}
      />
    </FlexWidget>
  );
}

// Android home screen widget — shows up to 3 recent activities with icons
export function RecentActivityWidget({ activities }: Props) {
  const hasActivities = activities.length > 0;

  return (
    <FlexWidget
      style={{
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        height: 'match_parent',
        width: 'match_parent',
      }}
      clickAction="OPEN_APP"
    >
      {/* Widget header */}
      <TextWidget
        text="Recent Activity"
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          color: '#3b82f6',
          marginBottom: 4,
        }}
      />

      {/* Activity rows or empty state */}
      {hasActivities
        ? (
            activities
              .slice(0, 3)
              .map(activity => (
                <ActivityRow key={activity.id} activity={activity} />
              ))
          )
        : (
            <TextWidget
              text="No activities yet"
              style={{ fontSize: 12, color: '#94a3b8' }}
            />
          )}
    </FlexWidget>
  );
}
