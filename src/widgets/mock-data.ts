// Shape of a single activity displayed in the home screen widget
export type WidgetActivity = {
  id: number;
  name: string;
  subtitle: string;
  date: string;
  sfSymbol: string;   // iOS SF Symbol name (maps to SvgWidget key on Android)
  iconColor: string;   // accent color for the icon tint
};

// Sample activities shown in the widget (max 3 visible at once)
export const WIDGET_ACTIVITIES: WidgetActivity[] = [
  {
    id: 1,
    name: 'New task assigned',
    subtitle: 'Design homepage mockup',
    date: '2h ago',
    sfSymbol: 'star.fill',
    iconColor: '#3b82f6',    // blue
  },
  {
    id: 2,
    name: 'Reminder triggered',
    subtitle: 'Follow up with client',
    date: '5h ago',
    sfSymbol: 'bell.fill',
    iconColor: '#f97316',    // orange
  },
  {
    id: 3,
    name: 'Message sent',
    subtitle: 'Proposal delivered to Alex',
    date: 'Yesterday',
    sfSymbol: 'paperplane.fill',
    iconColor: '#14b8a6',    // teal
  },
];

// Flattens activities into numbered props for iOS (expo-widgets can't use .map())
export function flattenActivitiesForWidget(activities: WidgetActivity[]) {
  const props: Record<string, string> = {};
  activities.slice(0, 3).forEach((a, i) => {
    const n = i + 1;
    props[`name${n}`] = a.name;
    props[`subtitle${n}`] = a.subtitle;
    props[`date${n}`] = a.date;
    props[`sfSymbol${n}`] = a.sfSymbol;
    props[`iconColor${n}`] = a.iconColor;
  });
  return props;
}
