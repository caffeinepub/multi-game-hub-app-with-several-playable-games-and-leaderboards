import type { GameInfo } from '../../gameRegistry';
import GameCard from './GameCard';

interface CategorySectionProps {
  category: string;
  games: GameInfo[];
  onPlay: (gameId: string) => void;
}

export default function CategorySection({ category, games, onPlay }: CategorySectionProps) {
  if (games.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 capitalize text-foreground">
        {category}
      </h2>
      <div className="game-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
}
