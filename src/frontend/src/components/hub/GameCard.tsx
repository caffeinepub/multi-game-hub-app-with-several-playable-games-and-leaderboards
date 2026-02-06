import { Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GameCategoryIcon from '../icons/GameCategoryIcon';
import type { GameInfo } from '../../gameRegistry';

interface GameCardProps {
  game: GameInfo;
  onPlay: (gameId: string) => void;
}

export default function GameCard({ game, onPlay }: GameCardProps) {
  return (
    <Card className="game-card-hover overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between">
          <GameCategoryIcon position={game.iconPosition} className="mb-2" />
          {!game.isPlayable && (
            <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
          )}
        </div>
        <CardTitle className="text-xl">{game.title}</CardTitle>
        <CardDescription>{game.description}</CardDescription>
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
          {game.tags && game.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onPlay(game.id)}
          disabled={!game.isPlayable}
          className="w-full gap-2"
        >
          <Play className="w-4 h-4" />
          {game.isPlayable ? 'Play Now' : 'Coming Soon'}
        </Button>
      </CardFooter>
    </Card>
  );
}
