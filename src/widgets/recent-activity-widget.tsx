import type { WidgetEnvironment } from 'expo-widgets';
import type { SFSymbol } from 'sf-symbols-typescript';
import { HStack, Image, Text, VStack } from '@expo/ui/swift-ui';
import {
  font,
  foregroundStyle,
  padding,
  widgetURL,
} from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';

// Flat numbered props — expo-widgets compiles JSX to SwiftUI, so .map() isn't supported
type WidgetProps = {
  name1?: string;
  subtitle1?: string;
  date1?: string;
  sfSymbol1?: string;
  iconColor1?: string;
  name2?: string;
  subtitle2?: string;
  date2?: string;
  sfSymbol2?: string;
  iconColor2?: string;
  name3?: string;
  subtitle3?: string;
  date3?: string;
  sfSymbol3?: string;
  iconColor3?: string;
};

// iOS home screen widget — adapts layout based on widget family (small vs medium)
function RecentActivityWidget(props: WidgetProps, env: WidgetEnvironment) {
  'widget';

  // systemSmall shows 1 row, systemMedium shows all 3
  const isSmall = env.widgetFamily === 'systemSmall';

  return (
    <VStack
      alignment="leading"
      spacing={isSmall ? 6 : 4}
      modifiers={[
        padding({ all: isSmall ? 12 : 16 }),
        widgetURL('expowidgetdemo://'),
      ]}
    >
      {/* Widget header */}
      <Text
        modifiers={[
          font({ size: isSmall ? 12 : 14, weight: 'bold' }),
          foregroundStyle('#3b82f6'),
        ]}
      >
        Recent Activity
      </Text>

      {/* Row 1 — visible in both small and medium */}
      {props.name1
        ? (
            <HStack spacing={8} modifiers={[padding({ vertical: 2 })]}>
              {props.sfSymbol1
                ? <Image systemName={props.sfSymbol1 as SFSymbol} size={16} color={props.iconColor1 ?? '#3b82f6'} />
                : null}
              <VStack alignment="leading" spacing={1}>
                <Text modifiers={[font({ size: 12, weight: 'semibold' }), foregroundStyle('#0f172a')]}>
                  {props.name1}
                </Text>
                {/* Hide subtitle on small widget — not enough space */}
                {!isSmall && props.subtitle1
                  ? (
                      <Text modifiers={[font({ size: 10 }), foregroundStyle('#64748b')]}>
                        {props.subtitle1}
                      </Text>
                    )
                  : null}
              </VStack>
              <Text modifiers={[font({ size: 10 }), foregroundStyle('#94a3b8')]}>
                {props.date1}
              </Text>
            </HStack>
          )
        : (
            <Text modifiers={[font({ size: 12 }), foregroundStyle('#94a3b8')]}>
              No activities yet
            </Text>
          )}

      {/* Row 2 — medium only */}
      {!isSmall && props.name2
        ? (
            <HStack spacing={8} modifiers={[padding({ vertical: 2 })]}>
              {props.sfSymbol2
                ? <Image systemName={props.sfSymbol2 as SFSymbol} size={16} color={props.iconColor2 ?? '#3b82f6'} />
                : null}
              <VStack alignment="leading" spacing={1}>
                <Text modifiers={[font({ size: 12, weight: 'semibold' }), foregroundStyle('#0f172a')]}>
                  {props.name2}
                </Text>
                <Text modifiers={[font({ size: 10 }), foregroundStyle('#64748b')]}>
                  {props.subtitle2}
                </Text>
              </VStack>
              <Text modifiers={[font({ size: 10 }), foregroundStyle('#94a3b8')]}>
                {props.date2}
              </Text>
            </HStack>
          )
        : null}

      {/* Row 3 — medium only */}
      {!isSmall && props.name3
        ? (
            <HStack spacing={8} modifiers={[padding({ vertical: 2 })]}>
              {props.sfSymbol3
                ? <Image systemName={props.sfSymbol3 as SFSymbol} size={16} color={props.iconColor3 ?? '#3b82f6'} />
                : null}
              <VStack alignment="leading" spacing={1}>
                <Text modifiers={[font({ size: 12, weight: 'semibold' }), foregroundStyle('#0f172a')]}>
                  {props.name3}
                </Text>
                <Text modifiers={[font({ size: 10 }), foregroundStyle('#64748b')]}>
                  {props.subtitle3}
                </Text>
              </VStack>
              <Text modifiers={[font({ size: 10 }), foregroundStyle('#94a3b8')]}>
                {props.date3}
              </Text>
            </HStack>
          )
        : null}
    </VStack>
  );
}

export default createWidget('RecentActivity', RecentActivityWidget);
