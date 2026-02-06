import { useState } from 'react';
import { Search } from 'lucide-react';
import { GAME_REGISTRY } from '../gameRegistry';
import BrandHeader from '../components/branding/BrandHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CategorySection from '../components/hub/CategorySection';
import GameCard from '../components/hub/GameCard';

export default function HubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const navigate = (gameId: string) => {
    window.location.hash = `/game/${gameId}`;
  };

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(GAME_REGISTRY.map(game => game.category)))];

  // Filter games based on search and category
  const filteredGames = GAME_REGISTRY.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group games by category for "all" view
  const gamesByCategory = filteredGames.reduce((acc, game) => {
    if (!acc[game.category]) {
      acc[game.category] = [];
    }
    acc[game.category].push(game);
    return acc;
  }, {} as Record<string, typeof GAME_REGISTRY>);

  // Get sorted category keys (alphabetically)
  const sortedCategories = Object.keys(gamesByCategory).sort();

  return (
    <div className="animate-fade-in">
      <BrandHeader />
      
      <div className="mb-8">
        <img 
          src="/assets/generated/game-hub-hero.dim_1600x600.png" 
          alt="GameHub Hero" 
          className="w-full h-48 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}
      </div>

      {/* Game Display - Grouped or Single Category */}
      {selectedCategory === 'all' ? (
        // Grouped view by category
        <div>
          {sortedCategories.map((category) => (
            <CategorySection
              key={category}
              category={category}
              games={gamesByCategory[category]}
              onPlay={navigate}
            />
          ))}
        </div>
      ) : (
        // Single category view
        <div className="game-grid">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onPlay={navigate} />
          ))}
        </div>
      )}

      {/* No results message */}
      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            No games found matching your search.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
