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
      if (!actor) return [];

      try {
        // Fetch all schools using empty search query
        const schools = await actor.searchSchoolsByName('');

        // If no filters, return all schools
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
        return schoolsWithTrainings.filter((school) =>
          school.trainings?.some((training) =>
            selectedHours.includes(Number(training.hours))
          )
        );
      } catch (error) {
        // Log structured diagnostic information for the failure
        logBackendCallFailure({
          method: 'searchSchoolsByName(\'\')',
          error,
          hasActor: !!actor,
        });
        throw error;
      }
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 30000, // 30 seconds
  });
}
