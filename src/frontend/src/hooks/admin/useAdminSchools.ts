import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { School } from '@/backend';
import { logBackendCallFailure } from '@/lib/backendDiagnostics';

export function useAdminSchools() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<School[]>({
    queryKey: ['admin-schools'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.searchSchoolsByName('');
      } catch (error) {
        logBackendCallFailure({
          method: 'searchSchoolsByName (admin)',
          error,
          hasActor: !!actor,
        });
        throw new Error('Failed to load schools. Please try again.');
      }
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 10000,
  });
}

export function useCreateSchool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      location,
      videoUrl,
    }: {
      id: string;
      name: string;
      location: string;
      videoUrl: string | null;
    }) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      try {
        await actor.createSchool(id, name, location, videoUrl);
      } catch (error: any) {
        console.error('[useCreateSchool] Failed:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to create schools.');
        }
        if (error.message?.includes('already exists')) {
          throw new Error('A school with this ID already exists.');
        }
        throw new Error('Failed to create school. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schools'] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
}

export function useUpdateSchool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      location,
      videoUrl,
    }: {
      id: string;
      name: string;
      location: string;
      videoUrl: string | null;
    }) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      try {
        await actor.updateSchool(id, name, location, videoUrl);
      } catch (error: any) {
        console.error('[useUpdateSchool] Failed:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to update schools.');
        }
        if (error.message?.includes('does not exist')) {
          throw new Error('School not found.');
        }
        throw new Error('Failed to update school. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schools'] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
}

export function useDeleteSchool() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (schoolId: string) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      try {
        await actor.deleteSchool(schoolId);
      } catch (error: any) {
        console.error('[useDeleteSchool] Failed:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to delete schools.');
        }
        if (error.message?.includes('does not exist')) {
          throw new Error('School not found.');
        }
        throw new Error('Failed to delete school. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schools'] });
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      queryClient.invalidateQueries({ queryKey: ['admin-teachers'] });
      queryClient.invalidateQueries({ queryKey: ['admin-trainings'] });
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
    },
  });
}
