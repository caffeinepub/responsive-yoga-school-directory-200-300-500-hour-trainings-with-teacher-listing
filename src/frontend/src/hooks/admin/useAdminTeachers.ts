import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { Teacher } from '@/backend';
import { logBackendCallFailure } from '@/lib/backendDiagnostics';

export function useAdminTeachers() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Teacher[]>({
    queryKey: ['admin-teachers'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const schools = await actor.searchSchoolsByName('');
        const allTeachers: Teacher[] = [];
        
        for (const school of schools) {
          try {
            const teachers = await actor.getTeachersBySchool(school.id);
            allTeachers.push(...teachers);
          } catch (err) {
            console.error(`[useAdminTeachers] Failed to fetch teachers for school ${school.id}:`, err);
          }
        }
        
        return allTeachers;
      } catch (error) {
        logBackendCallFailure({
          method: 'getTeachersBySchool (admin)',
          error,
          hasActor: !!actor,
        });
        throw new Error('Failed to load teachers. Please try again.');
      }
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 10000,
  });
}

export function useCreateTeacher() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      specialization,
      schoolId,
    }: {
      id: string;
      name: string;
      specialization: string;
      schoolId: string;
    }) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      try {
        await actor.addTeacher(id, name, specialization, schoolId);
      } catch (error: any) {
        console.error('[useCreateTeacher] Failed:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to create teachers.');
        }
        if (error.message?.includes('already exists')) {
          throw new Error('A teacher with this ID already exists.');
        }
        if (error.message?.includes('School does not exist')) {
          throw new Error('The selected school does not exist.');
        }
        throw new Error('Failed to create teacher. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-teachers'] });
    },
  });
}

export function useDeleteTeacher() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teacherId: string) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      try {
        await actor.deleteTeacher(teacherId);
      } catch (error: any) {
        console.error('[useDeleteTeacher] Failed:', error);
        if (error.message?.includes('Unauthorized')) {
          throw new Error('You do not have permission to delete teachers.');
        }
        if (error.message?.includes('does not exist')) {
          throw new Error('Teacher not found.');
        }
        throw new Error('Failed to delete teacher. Please try again.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-teachers'] });
    },
  });
}
