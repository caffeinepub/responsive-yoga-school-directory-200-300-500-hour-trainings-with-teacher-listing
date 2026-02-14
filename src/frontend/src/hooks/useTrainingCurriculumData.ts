import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { School, Training } from '@/backend';

interface TrainingCurriculumData {
  school: School | null;
  training: Training | null;
  isLoading: boolean;
  error: Error | null;
}

export function useTrainingCurriculumData(
  schoolId: string,
  trainingId: string
): TrainingCurriculumData {
  const { actor, isFetching: isActorFetching } = useActor();

  const {
    data: school,
    isLoading: isSchoolLoading,
    error: schoolError,
  } = useQuery<School | null>({
    queryKey: ['school', schoolId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSchool(schoolId);
      } catch (error) {
        console.error('Failed to fetch school:', error);
        return null;
      }
    },
    enabled: !!actor && !isActorFetching && !!schoolId,
  });

  const {
    data: training,
    isLoading: isTrainingLoading,
    error: trainingError,
  } = useQuery<Training | null>({
    queryKey: ['training', trainingId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getTraining(trainingId);
      } catch (error) {
        console.error('Failed to fetch training:', error);
        return null;
      }
    },
    enabled: !!actor && !isActorFetching && !!trainingId,
  });

  return {
    school: school || null,
    training: training || null,
    isLoading: isSchoolLoading || isTrainingLoading || isActorFetching,
    error: (schoolError || trainingError) as Error | null,
  };
}
