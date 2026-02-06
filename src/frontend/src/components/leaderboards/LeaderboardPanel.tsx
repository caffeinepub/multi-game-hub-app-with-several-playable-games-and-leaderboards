import { Trophy, Medal, Award } from 'lucide-react';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { useGetTopScores, useGetUserBestScore } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface LeaderboardPanelProps {
  gameId: string;
  gameTitle: string;
}

export default function LeaderboardPanel({ gameId, gameTitle }: LeaderboardPanelProps) {
  const { isAuthenticated, principal } = useAuthStatus();
  const { data: topScores, isLoading: scoresLoading } = useGetTopScores(gameId);
  const { data: userBestScore, isLoading: userScoreLoading } = useGetUserBestScore(gameId, isAuthenticated);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-amber-500" />;
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Award className="w-5 h-5 text-amber-700" />;
    return null;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Top Scores - {gameTitle}
          </CardTitle>
          <CardDescription>
            See how you rank against other players
          </CardDescription>
        </CardHeader>
        <CardContent>
          {scoresLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : topScores && topScores.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topScores.slice(0, 10).map((score, index) => {
                  const isCurrentUser = score.user.toString() === principal;
                  return (
                    <TableRow key={`${score.user.toString()}-${index}`} className={isCurrentUser ? 'bg-accent/50' : ''}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getRankIcon(index)}
                          <span>{index + 1}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">
                            {score.user.toString().slice(0, 8)}...
                          </span>
                          {isCurrentUser && (
                            <Badge variant="secondary" className="text-xs">You</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {score.score}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No scores yet. Be the first to play!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Best Score</CardTitle>
          </CardHeader>
          <CardContent>
            {userScoreLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : userBestScore ? (
              <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                <span className="text-muted-foreground">Your personal best:</span>
                <span className="text-3xl font-bold text-primary">{userBestScore.score}</span>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                You haven't played this game yet. Give it a try!
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
