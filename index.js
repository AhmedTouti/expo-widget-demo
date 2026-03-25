// Register Android widget task handler BEFORE expo-router entry
// This must run first so the headless task is available when Android triggers it
import { registerAndroidWidgetTaskHandler } from './src/widgets/widget-task-handler';

registerAndroidWidgetTaskHandler();

// Now load the expo-router entry
import 'expo-router/entry';
