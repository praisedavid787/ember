import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, radii, spacing, typography } from '../theme/colors';
import type { Profile } from '../types/profile';

type Props = {
  profile: Profile;
  // Compact mode renders without the gradient overlay — used in the
  // Match screen where the card is presented in a calmer layout.
  compact?: boolean;
  // Which photo in the gallery to show. The Swipe card drives this as you tap
  // through; defaults to the cover for static placements (e.g. Match screen).
  activePhotoIndex?: number;
};

export function ProfileCard({ profile, compact = false, activePhotoIndex = 0 }: Props) {
  const { photos } = profile;
  const index = Math.min(Math.max(activePhotoIndex, 0), photos.length - 1);

  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <Image source={{ uri: photos[index] }} style={styles.image} resizeMode="cover" />

      {photos.length > 1 && (
        <View style={styles.indicators} pointerEvents="none">
          {photos.map((photo, i) => (
            <View
              key={photo}
              style={[styles.indicatorTrack, i === index && styles.indicatorActive]}
            />
          ))}
        </View>
      )}

      <View style={[styles.meta, compact && styles.metaCompact]}>
        <View style={styles.headerRow}>
          <Text style={[styles.name, compact && styles.nameCompact]} numberOfLines={1}>
            {profile.name}
            <Text style={[styles.age, compact && styles.nameCompact]}>, {profile.age}</Text>
          </Text>
        </View>

        <Text style={[styles.bio, compact && styles.bioCompact]} numberOfLines={compact ? 0 : 2}>
          {profile.bio}
        </Text>

        <View style={styles.interestRow}>
          {profile.interests.map(interest => (
            <View key={interest} style={[styles.chip, compact && styles.chipCompact]}>
              <Text style={[styles.chipText, compact && styles.chipTextCompact]}>{interest}</Text>
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
  // Story-style segmented progress bar pinned to the top of the card.
  indicators: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    gap: spacing.xs,
  },
  indicatorTrack: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  indicatorActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
  // Compact mode sits on a light surface (Match screen), so the overlay's
  // white text/chips would be invisible — flip them to dark-on-light.
  nameCompact: {
    color: colors.textPrimary,
  },
  bioCompact: {
    color: colors.textSecondary,
    opacity: 1,
  },
  chipCompact: {
    backgroundColor: 'rgba(10, 10, 10, 0.06)',
  },
  chipTextCompact: {
    color: colors.textSecondary,
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
