import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, radii, spacing, typography } from '../../theme/colors';
import { profiles } from '../../data/profiles';
import { SwipeCard } from '../../components/SwipeCard';
import type { SwipeCardHandle, SwipeDirection } from '../../components/SwipeCard';
import { useMatches } from '../../state/MatchesProvider';
import type { RootStackParamList } from '../../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Swipe'>;

// How many cards are mounted at once: the top card plus two behind it.
const VISIBLE = 3;

export function SwipeScreen() {
  const navigation = useNavigation<Nav>();
  const { addMatch } = useMatches();
  const [index, setIndex] = useState(0);
  const topRef = useRef<SwipeCardHandle>(null);

  const handleSwipe = useCallback(
    (direction: SwipeDirection, profile: (typeof profiles)[number]) => {
      setIndex(prev => prev + 1);
      if (direction === 'right') {
        addMatch(profile);
        navigation.navigate('Match', { profile });
      }
    },
    [addMatch, navigation],
  );

  // Buttons drive the same fly-out as a gesture, via the top card's handle.
  const triggerSwipe = useCallback((direction: SwipeDirection) => {
    topRef.current?.swipe(direction);
  }, []);

  const exhausted = index >= profiles.length;

  // Top card first; reversed only for paint order so the top card sits on top.
  const deck = profiles
    .slice(index, index + VISIBLE)
    .map((profile, stackIndex) => ({ profile, stackIndex }));

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>
          {exhausted ? 'No one left for now' : `${profiles.length - index} nearby`}
        </Text>
      </View>

      <View style={styles.deck}>
        {exhausted ? (
          <View style={styles.empty} accessibilityRole="summary">
            <Text style={styles.emptyTitle}>You're all caught up</Text>
            <Text style={styles.emptyBody}>
              You've seen everyone nearby. Check back later for new people.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Start over from the first profile"
              onPress={() => setIndex(0)}
              style={({ pressed }) => [styles.startOver, pressed && styles.pressed]}
            >
              <Text style={styles.startOverText}>Start over</Text>
            </Pressable>
          </View>
        ) : (
          deck
            .slice()
            .reverse()
            .map(({ profile, stackIndex }) => (
              <SwipeCard
                key={profile.id}
                ref={stackIndex === 0 ? topRef : undefined}
                profile={profile}
                stackIndex={stackIndex}
                active={stackIndex === 0}
                onSwipe={handleSwipe}
              />
            ))
        )}
      </View>

      {!exhausted && (
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Pass on this person"
            onPress={() => triggerSwipe('left')}
            style={({ pressed }) => [styles.action, styles.pass, pressed && styles.pressed]}
          >
            <Text style={[styles.actionGlyph, styles.passGlyph]}>✕</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Like this person"
            onPress={() => triggerSwipe('right')}
            style={({ pressed }) => [styles.action, styles.like, pressed && styles.pressed]}
          >
            <Text style={[styles.actionGlyph, styles.likeGlyph]}>♥</Text>
          </Pressable>
        </View>
      )}
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
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  deck: {
    flex: 1,
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    ...typography.title,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  startOver: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  startOverText: {
    ...typography.button,
    color: colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.lg,
  },
  action: {
    width: 64,
    height: 64,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  pass: {},
  like: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  actionGlyph: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 32,
  },
  passGlyph: {
    color: colors.textPrimary,
  },
  likeGlyph: {
    color: colors.background,
  },
  pressed: {
    opacity: 0.8,
  },
});
