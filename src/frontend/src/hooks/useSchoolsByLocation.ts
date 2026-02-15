import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { School } from '@/backend';
import { logBackendCallFailure } from '@/lib/backendDiagnostics';

export function useSchoolsByLocation(
  country?: string,
  state?: string,
  city?: string
) {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<School[]>({
    queryKey: ['schools-by-location', country, state, city],
    queryFn: async () => {
      if (!actor) return [];

      try {
        return await actor.getSchoolsByLocation(
          country || null,
          state || null,
          city || null
        );
      } catch (error) {
        logBackendCallFailure({
          method: 'getSchoolsByLocation',
          error,
          hasActor: !!actor,
        });
        throw new Error('Failed to load schools for this location. Please try again.');
      }
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 30000,
  });
}
