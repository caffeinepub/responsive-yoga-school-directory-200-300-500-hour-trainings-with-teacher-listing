import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Review } from '@/backend';

export function useSchoolReviews(schoolId: string) {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Review[]>({
    queryKey: ['reviews', schoolId],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getReviewsForSchool(schoolId);
      } catch (error) {
        console.error('Failed to fetch reviews for school:', schoolId, error);
        throw new Error('Unable to load reviews. Please try again later.');
      }
    },
    enabled: !!actor && !isActorFetching && !!schoolId,
    staleTime: 30000, // 30 seconds
  });
}

export function useAddSchoolReview(schoolId: string) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reviewerName,
      rating,
      comment,
    }: {
      reviewerName: string;
      rating: number;
      comment: string;
    }) => {
      if (!actor) {
        throw new Error('Backend connection not available. Please try again.');
      }
      try {
        await actor.addReview(schoolId, reviewerName, BigInt(rating), comment);
      } catch (error) {
        console.error('Failed to submit review:', error);
        throw new Error('Failed to submit review. Please try again.');
      }
    },
    onSuccess: () => {
      // Invalidate and refetch reviews for this school
      queryClient.invalidateQueries({ queryKey: ['reviews', schoolId] });
    },
  });
}
