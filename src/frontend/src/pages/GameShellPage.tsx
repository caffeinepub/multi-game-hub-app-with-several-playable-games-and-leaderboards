import { ArrowLeft } from 'lucide-react';
import { getGameById } from '../gameRegistry';
import TicTacToeGame from '../games/ticTacToe/TicTacToeGame';
import ReactionTimerGame from '../games/reaction/ReactionTimerGame';
import WordScrambleGame from '../games/word/WordScrambleGame';
import ComingSoonGame from '../games/comingSoon/ComingSoonGame';
import LeaderboardPanel from '../components/leaderboards/LeaderboardPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GameShellPageProps {
  gameId: string;
}

export default function GameShellPage({ gameId }: GameShellPageProps) {
  const game = getGameById(gameId);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  if (!game) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Game not found</h2>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hub
        </Button>
      </div>
    );
  }

  const renderGame = () => {
    if (!game.isPlayable) {
      return <ComingSoonGame gameTitle={game.title} />;
    }

    switch (game.id) {
      case 'tic-tac-toe':
        return <TicTacToeGame gameId={game.id} />;
      case 'reaction-timer':
        return <ReactionTimerGame gameId={game.id} />;
      case 'word-scramble':
        return <WordScrambleGame gameId={game.id} />;
      default:
        return <ComingSoonGame gameTitle={game.title} />;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </Button>
      </div>

      {/* Game metadata card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{game.title}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </div>
            {!game.isPlayable && (
              <Badge variant="secondary">Coming Soon</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="capitalize">
              {game.category}
            </Badge>
            {game.difficulty && (
              <Badge 
                variant={game.difficulty === 'hard' ? 'destructive' : game.difficulty === 'medium' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {game.difficulty}
              </Badge>
            )}
            {game.tags && game.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {renderGame()}
        </div>
        <div className="lg:col-span-1">
          {game.isPlayable && (
            <LeaderboardPanel gameId={game.id} gameTitle={game.title} />
          )}
        </div>
      </div>
    </div>
  );
}
