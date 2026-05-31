import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import type { Profile } from '../types/profile';

// Lightweight app-wide store for the people you've liked. Context (not Redux)
// is the right weight for a three-screen prototype — see the README's
// "state management" note. Swap for Zustand only if the surface grows.
type MatchesContextValue = {
  matches: Profile[];
  addMatch: (profile: Profile) => void;
  reset: () => void;
};

const MatchesContext = createContext<MatchesContextValue | null>(null);

export function MatchesProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<Profile[]>([]);

  const addMatch = useCallback((profile: Profile) => {
    setMatches(prev =>
      prev.some(m => m.id === profile.id) ? prev : [...prev, profile],
    );
  }, []);

  const reset = useCallback(() => setMatches([]), []);

  const value = useMemo(
    () => ({ matches, addMatch, reset }),
    [matches, addMatch, reset],
  );

  return <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>;
}

export function useMatches() {
  const ctx = useContext(MatchesContext);
  if (!ctx) {
    throw new Error('useMatches must be used within a MatchesProvider');
  }
  return ctx;
}
