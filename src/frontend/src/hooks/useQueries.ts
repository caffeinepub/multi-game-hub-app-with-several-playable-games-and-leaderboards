import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, HighScore } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
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

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetTopScores(gameId: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<HighScore[]>({
    queryKey: ['topScores', gameId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopScores(gameId);
    },
    enabled: !!actor && !actorFetching && !!gameId,
  });
}

export function useGetUserBestScore(gameId: string, enabled: boolean = true) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<HighScore | null>({
    queryKey: ['userBestScore', gameId],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getUserBestScore(gameId);
      } catch (error) {
        // User not authenticated or no score yet
        return null;
      }
    },
    enabled: !!actor && !actorFetching && !!gameId && enabled,
    retry: false,
  });
}

export function useSubmitScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ gameId, score }: { gameId: string; score: number }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitScore(gameId, score);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['topScores', variables.gameId] });
      queryClient.invalidateQueries({ queryKey: ['userBestScore', variables.gameId] });
    },
  });
}
