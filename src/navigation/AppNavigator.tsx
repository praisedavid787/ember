import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen } from '../screens/Welcome';
import { SwipeScreen } from '../screens/Swipe';
import { MatchScreen } from '../screens/Match';
import type { Profile } from '../types/profile';

// Route param contract — typed so screens get autocomplete on navigation.params.
export type RootStackParamList = {
  Welcome: undefined;
  Swipe: undefined;
  Match: { profile: Profile };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Swipe" component={SwipeScreen} />
        <Stack.Screen
          name="Match"
          component={MatchScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
