import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { Review } from '@/backend';
import { logBackendCallFailure } from '@/lib/backendDiagnostics';

export function useAdminReviews() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const schools = await actor.searchSchoolsByName('');
        const allReviews: Review[] = [];
        
        for (const school of schools) {
          try {
            const reviews = await actor.getReviewsForSchool(school.id);
            allReviews.push(...reviews);
          } catch (err) {
            console.error(`[useAdminReviews] Failed to fetch reviews for school ${school.id}:`, err);
          }
        }
        
        return allReviews;
      } catch (error) {
        logBackendCallFailure({
          method: 'getReviewsForSchool (admin)',
          error,
          hasActor: !!actor,
        });
        throw new Error('Failed to load reviews. Please try again.');
      }
    },
    enabled: !!actor && !isActorFetching,
    staleTime: 10000,
  });
}

export function useDeleteReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewIndex: number) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      throw new Error('Review deletion is not yet implemented in the backend. Please contact support.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
