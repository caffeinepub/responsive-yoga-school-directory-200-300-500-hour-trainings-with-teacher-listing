import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Teacher, Training } from '@/backend';

export function useSchoolCardData(schoolId: string) {
  const { actor, isFetching: isActorFetching } = useActor();

  const trainingsQuery = useQuery<Training[]>({
    queryKey: ['trainings', schoolId],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getTrainingsBySchool(schoolId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isActorFetching && !!schoolId,
    staleTime: 60000,
  });

  const teachersQuery = useQuery<Teacher[]>({
    queryKey: ['teachers', schoolId],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getTeachersBySchool(schoolId);
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isActorFetching && !!schoolId,
    staleTime: 60000,
  });

  return {
    trainings: trainingsQuery.data,
    teachers: teachersQuery.data,
    isLoading: trainingsQuery.isLoading || teachersQuery.isLoading,
  };
}
