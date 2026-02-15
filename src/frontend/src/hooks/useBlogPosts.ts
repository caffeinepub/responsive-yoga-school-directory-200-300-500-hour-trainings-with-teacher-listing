import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BlogPost } from '../backend';
import { logBackendCallFailure } from '../lib/backendDiagnostics';

export function useGetAllBlogPosts() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAllBlogPosts();
      } catch (error) {
        logBackendCallFailure({
          method: 'getAllBlogPosts',
          error,
          hasActor: !!actor,
        });
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetBlogPost(id: string) {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<BlogPost | null>({
    queryKey: ['blogPost', id],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getBlogPost(id);
      } catch (error) {
        logBackendCallFailure({
          method: 'getBlogPost',
          error,
          hasActor: !!actor,
        });
        throw error;
      }
    },
    enabled: !!actor && !actorFetching && !!id,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}
