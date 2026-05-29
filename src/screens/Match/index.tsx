import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { colors, radii, spacing, typography } from '../../theme/colors';
import { ProfileCard } from '../../components/ProfileCard';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { profiles } from '../../data/profiles';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Match'>;
type Route = RouteProp<RootStackParamList, 'Match'>;

export function MatchScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  // Fall back to the first profile so the screen renders during scaffold
  // testing before the Swipe screen wires up navigation params.
  const profile = route.params?.profile ?? profiles[0];

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>It's a match</Text>
          <Text style={styles.bannerSubtitle}>
            You and {profile.name} liked each other.
          </Text>
        </View>

        <View style={styles.cardWrapper}>
          <ProfileCard profile={profile} compact />
        </View>

        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Send ${profile.name} a message`}
            onPress={() => {
              /* TODO: wire to chat surface */
            }}
            style={({ pressed }) => [styles.primary, pressed && styles.pressed]}
          >
            <Text style={styles.primaryText}>Send a message</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Keep swiping"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}
          >
            <Text style={styles.secondaryText}>Keep swiping</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  banner: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  bannerTitle: {
    ...typography.display,
    color: colors.accent,
  },
  bannerSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  cardWrapper: {
    marginBottom: spacing.xl,
  },
  actionRow: {
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    alignItems: 'center',
  },
  primaryText: {
    ...typography.button,
    color: colors.background,
  },
  secondary: {
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: {
    ...typography.button,
    color: colors.textPrimary,
  },
  pressed: {
    opacity: 0.85,
  },
});
