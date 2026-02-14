import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { School, Teacher, Training } from '@/backend';

export function useSchoolDetails(schoolId: string) {
  const { actor, isFetching: isActorFetching } = useActor();

  const schoolQuery = useQuery<School | null>({
    queryKey: ['school', schoolId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSchool(schoolId);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isActorFetching && !!schoolId,
    staleTime: 60000, // 1 minute
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

  return {
    school: schoolQuery.data,
    teachers: teachersQuery.data,
    trainings: trainingsQuery.data,
    isLoading: schoolQuery.isLoading || teachersQuery.isLoading || trainingsQuery.isLoading,
    error: schoolQuery.error || teachersQuery.error || trainingsQuery.error,
  };
}
