import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { School, Training } from '@/backend';
import { logBackendCallFailure } from '@/lib/backendDiagnostics';

interface SchoolWithTrainings extends School {
  trainings?: Training[];
}

export function useSchools(selectedHours: number[]) {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<SchoolWithTrainings[]>({
    queryKey: ['schools', selectedHours],
    queryFn: async () => {
      if (!actor) {
        console.warn('[useSchools] Actor not available, returning empty array');
        return [];
      }

      try {
        console.log('[useSchools] Fetching schools with searchSchoolsByName("")');
        // Fetch all schools using empty search query
        const schools = await actor.searchSchoolsByName('');
        console.log('[useSchools] Fetched schools:', schools.length);

        // If no filters, return all schools (including empty array if backend returns empty)
        if (selectedHours.length === 0) {
          return schools;
        }

        // Fetch trainings for each school and filter
        const schoolsWithTrainings = await Promise.all(
          schools.map(async (school) => {
            try {
              const trainings = await actor.getTrainingsBySchool(school.id);
              return { ...school, trainings };
            } catch (err) {
              console.error(`[useSchools] Failed to fetch trainings for school ${school.id}:`, err);
              return { ...school, trainings: [] };
            }
          })
        );

        // Filter schools that have at least one matching training
        const filtered = schoolsWithTrainings.filter((school) =>
          school.trainings?.some((training) =>
            selectedHours.includes(Number(training.hours))
          )
        );
        
        console.log('[useSchools] Filtered schools:', filtered.length);
        return filtered;
      } catch (error) {
        // Log structured diagnostic information for the failure
        logBackendCallFailure({
          method: 'searchSchoolsByName(\'\')',
          error,
          hasActor: !!actor,
        });
        
        // Always throw errors to trigger error UI - let React Query handle retries
        console.error('[useSchools] Backend call failed, throwing error:', error);
        throw error;
      }
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 30000, // 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
