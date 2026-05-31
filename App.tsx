import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation/AppNavigator';
import { MatchesProvider } from './src/state/MatchesProvider';

// GestureHandlerRootView must wrap everything that uses gesture-handler — the
// swipe deck depends on it. SafeAreaProvider feeds insets to per-screen
// SafeAreaView edges. MatchesProvider holds the liked-profiles state shared
// between the Swipe and Match screens.
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <MatchesProvider>
          <AppNavigator />
        </MatchesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
