import { Trophy, ArrowLeft } from 'lucide-react';
import { GAME_REGISTRY } from '../gameRegistry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GameCategoryIcon from '../components/icons/GameCategoryIcon';

export default function AllLeaderboardsPage() {
  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const playableGames = GAME_REGISTRY.filter(game => game.isPlayable);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </Button>
      </div>

      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Trophy className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Leaderboards</h1>
        <p className="text-lg text-muted-foreground">
          View top scores across all games
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playableGames.map((game) => (
          <Card 
            key={game.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/game/${game.id}`)}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <GameCategoryIcon position={game.iconPosition} />
                <div className="flex-1">
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
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
                {game.tags && game.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="w-full">
                View Leaderboard
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
