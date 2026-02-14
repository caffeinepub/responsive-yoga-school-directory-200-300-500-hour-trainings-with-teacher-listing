import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { School, Training } from '@/backend';

interface SimilarSchool extends School {
  matchScore: number;
}

export function useSimilarSchools(currentSchoolId: string, limit: number = 4) {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<School[]>({
    queryKey: ['similarSchools', currentSchoolId],
    queryFn: async () => {
      if (!actor) return [];

      try {
        // Fetch all schools
        const allSchools = await actor.searchSchoolsByName('');
        
        // Exclude current school
        const otherSchools = allSchools.filter((school) => school.id !== currentSchoolId);

        if (otherSchools.length === 0) {
          return [];
        }

        // Get current school's trainings for comparison
        let currentTrainings: Training[] = [];
        try {
          currentTrainings = await actor.getTrainingsBySchool(currentSchoolId);
        } catch {
          // If we can't get trainings, just return random schools
          return otherSchools.slice(0, limit);
        }

        const currentHours = new Set(currentTrainings.map((t) => Number(t.hours)));

        // Score schools based on matching training hours
        const scoredSchools: SimilarSchool[] = await Promise.all(
          otherSchools.map(async (school) => {
            let matchScore = 0;
            try {
              const trainings = await actor.getTrainingsBySchool(school.id);
              const schoolHours = trainings.map((t) => Number(t.hours));
              
              // Count matching training hours
              matchScore = schoolHours.filter((hours) => currentHours.has(hours)).length;
            } catch {
              matchScore = 0;
            }
            return { ...school, matchScore };
          })
        );

        // Sort by match score (descending) and return top matches
        scoredSchools.sort((a, b) => b.matchScore - a.matchScore);
        
        return scoredSchools.slice(0, limit);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isActorFetching && !!currentSchoolId,
    staleTime: 60000, // 1 minute
  });
}
