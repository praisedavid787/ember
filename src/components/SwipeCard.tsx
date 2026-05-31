import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ProfileCard } from './ProfileCard';
import { colors, radii, spacing } from '../theme/colors';
import type { Profile } from '../types/profile';

export type SwipeDirection = 'left' | 'right';

// Imperative handle so the on-screen buttons can trigger the *same* fly-out
// animation a gesture produces — the swipe is never gesture-only (a11y).
export type SwipeCardHandle = {
  swipe: (direction: SwipeDirection) => void;
};

type Props = {
  profile: Profile;
  onSwipe: (direction: SwipeDirection, profile: Profile) => void;
  // Only the top card is interactive; the rest render as a stacked backdrop.
  active: boolean;
  // 0 = top of the deck, 1 = the card behind it, etc.
  stackIndex: number;
};

// Past this fraction of screen width (or a hard flick) the card commits.
const SWIPE_THRESHOLD = 0.28;
const FLING_VELOCITY = 800;
const FLY_OUT_DURATION = 240;
const MAX_TILT_DEG = 12;

export const SwipeCard = forwardRef<SwipeCardHandle, Props>(function SwipeCard(
  { profile, onSwipe, active, stackIndex },
  ref,
) {
  const { width } = useWindowDimensions();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  // Springs toward `stackIndex`; when the top card leaves, the card behind it
  // animates forward instead of snapping.
  const stack = useSharedValue(stackIndex);
  useEffect(() => {
    stack.value = withSpring(stackIndex, { damping: 18, stiffness: 160 });
  }, [stackIndex]);

  // Runs on the JS thread (from a button tap or via runOnJS on gesture end).
  // Assigning withTiming to a shared value from JS is supported by Reanimated.
  const flyOut = (direction: SwipeDirection) => {
    const toX = (direction === 'right' ? 1 : -1) * width * 1.6;
    translateX.value = withTiming(toX, { duration: FLY_OUT_DURATION }, finished => {
      if (finished) {
        runOnJS(onSwipe)(direction, profile);
      }
    });
  };

  useImperativeHandle(ref, () => ({ swipe: flyOut }), [width]);

  const pan = Gesture.Pan()
    .enabled(active)
    .onUpdate(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(event => {
      const threshold = width * SWIPE_THRESHOLD;
      const fling = Math.abs(event.velocityX) > FLING_VELOCITY;
      const goRight = translateX.value > threshold || (fling && event.velocityX > 0);
      const goLeft = translateX.value < -threshold || (fling && event.velocityX < 0);

      if (goRight) {
        runOnJS(flyOut)('right');
      } else if (goLeft) {
        runOnJS(flyOut)('left');
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width, 0, width],
      [-MAX_TILT_DEG, 0, MAX_TILT_DEG],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(stack.value, [0, 1, 2], [1, 0.94, 0.88], Extrapolation.CLAMP);
    const stackOffsetY = interpolate(stack.value, [0, 1, 2], [0, 16, 30], Extrapolation.CLAMP);

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value + stackOffsetY },
        { rotateZ: `${rotate}deg` },
        { scale },
      ],
    };
  });

  const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, width * SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));

  const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-width * SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.container, { zIndex: 100 - stackIndex }, cardStyle]}
        pointerEvents={active ? 'auto' : 'none'}
      >
        <View style={styles.cardArea}>
          <ProfileCard profile={profile} />

          {active && (
            <>
              <Animated.View style={[styles.badge, styles.likeBadge, likeStyle]}>
                <Text style={[styles.badgeText, styles.likeText]}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[styles.badge, styles.nopeBadge, nopeStyle]}>
                <Text style={[styles.badgeText, styles.nopeText]}>NOPE</Text>
              </Animated.View>
            </>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  // Matches ProfileCard's box so the badges pin to the card's real edges.
  cardArea: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  badge: {
    position: 'absolute',
    top: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.sm,
    borderWidth: 3,
  },
  likeBadge: {
    left: spacing.lg,
    borderColor: colors.accent,
    transform: [{ rotate: '-12deg' }],
  },
  nopeBadge: {
    right: spacing.lg,
    borderColor: colors.textPrimary,
    transform: [{ rotate: '12deg' }],
  },
  badgeText: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
  },
  likeText: {
    color: colors.accent,
  },
  nopeText: {
    color: colors.textPrimary,
  },
});
