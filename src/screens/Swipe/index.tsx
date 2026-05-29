import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { colors, spacing, typography } from '../../theme/colors';
import { profiles } from '../../data/profiles';
import { ProfileCard } from '../../components/ProfileCard';

// SCAFFOLD STATE
// --------------
// This renders the top card of the deck statically — enough to see styling,
// data, and layout. The real implementation should add:
//
//   - Gesture handler (PanGestureHandler from react-native-gesture-handler)
//   - Reanimated shared values for translateX / rotate
//   - Snap-to-edge on velocity OR x-threshold, decay otherwise
//   - Two next-cards behind the top for the deck stack effect
//   - Buttons (skip + like) that programmatically drive the same animations
//     so the swipe is accessible without a gesture
//   - Empty-state when index >= profiles.length
//   - Match modal trigger on "like" (navigation.navigate('Match', { profile }))

export function SwipeScreen() {
  const topProfile = profiles[0];

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
      </View>

      <View style={styles.deck}>
        <ProfileCard profile={topProfile} />
      </View>

      <View style={styles.actions}>
        <Text style={styles.actionsHint}>Swipe right to like · left to pass</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  deck: {
    flex: 1,
    justifyContent: 'center',
  },
  actions: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  actionsHint: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
