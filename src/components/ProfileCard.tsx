import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../theme/colors';
import type { Profile } from '../types/profile';

type Props = {
  profile: Profile;
  // Compact mode renders without the gradient overlay — used in the
  // Match screen where the card is presented in a calmer layout.
  compact?: boolean;
};

export function ProfileCard({ profile, compact = false }: Props) {
  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <Image source={{ uri: profile.imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={[styles.meta, compact && styles.metaCompact]}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {profile.name}
            <Text style={styles.age}>, {profile.age}</Text>
          </Text>
        </View>

        <Text style={styles.bio} numberOfLines={compact ? 0 : 2}>
          {profile.bio}
        </Text>

        <View style={styles.interestRow}>
          {profile.interests.map(interest => (
            <View key={interest} style={styles.chip}>
              <Text style={styles.chipText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  cardCompact: {
    aspectRatio: undefined,
    height: undefined,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  meta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.lg,
    backgroundColor: 'rgba(10, 10, 10, 0.55)',
  },
  metaCompact: {
    position: 'relative',
    backgroundColor: colors.surface,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  name: {
    ...typography.title,
    color: colors.background,
    fontSize: 26,
  },
  age: {
    ...typography.title,
    color: colors.background,
    fontWeight: '400',
    fontSize: 22,
  },
  bio: {
    ...typography.body,
    color: colors.background,
    marginTop: spacing.xs,
    opacity: 0.9,
  },
  interestRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  chipText: {
    ...typography.caption,
    color: colors.background,
    fontWeight: '500',
  },
});
