import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { Training } from '@/backend';
import { logBackendCallFailure } from '@/lib/backendDiagnostics';

export function useAdminTrainings() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Training[]>({
    queryKey: ['admin-trainings'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const schools = await actor.searchSchoolsByName('');
        const allTrainings: Training[] = [];
        
        for (const school of schools) {
          try {
            const trainings = await actor.getTrainingsBySchool(school.id);
            allTrainings.push(...trainings);
          } catch (err) {
            console.error(`[useAdminTrainings] Failed to fetch trainings for school ${school.id}:`, err);
          }
        }
        
        return allTrainings;
      } catch (error) {
        logBackendCallFailure({
          method: 'getTrainingsBySchool (admin)',
          error,
          hasActor: !!actor,
        });
        throw new Error('Failed to load trainings. Please try again.');
      }
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 10000,
  });
}

export function useCreateTraining() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      hours,
      description,
      schoolId,
    }: {
      id: string;
      hours: bigint;
      description: string;
      schoolId: string;
    }) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      try {
        await actor.addTraining(id, hours, description, schoolId);
      } catch (error: any) {
        console.error('[useCreateTraining] Failed:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to create trainings.');
        }
        if (error.message?.includes('already exists')) {
          throw new Error('A training with this ID already exists.');
        }
        if (error.message?.includes('School does not exist')) {
          throw new Error('The selected school does not exist.');
        }
        throw new Error('Failed to create training. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-trainings'] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
}

export function useDeleteTraining() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (trainingId: string) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      try {
        await actor.deleteTraining(trainingId);
      } catch (error: any) {
        console.error('[useDeleteTraining] Failed:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to delete trainings.');
        }
        if (error.message?.includes('does not exist')) {
          throw new Error('Training not found.');
        }
        throw new Error('Failed to delete training. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-trainings'] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
}
