import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BlogPost } from '../backend';
import { logBackendCallFailure } from '../lib/backendDiagnostics';

export function useGetAllBlogPosts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
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
  });
}

export function useGetBlogPost(id: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<BlogPost | null>({
    queryKey: ['blogPost', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
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
  });
}
