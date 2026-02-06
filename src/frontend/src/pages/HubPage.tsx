import { useState } from 'react';
import { Play, Search } from 'lucide-react';
import { GAME_REGISTRY } from '../gameRegistry';
import BrandHeader from '../components/branding/BrandHeader';
import GameCategoryIcon from '../components/icons/GameCategoryIcon';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

      {/* Game Grid */}
      <div className="game-grid">
        {filteredGames.map((game) => (
          <Card 
            key={game.id} 
            className="game-card-hover overflow-hidden"
          >
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
                onClick={() => navigate(game.id)}
                disabled={!game.isPlayable}
                className="w-full gap-2"
              >
                <Play className="w-4 h-4" />
                {game.isPlayable ? 'Play Now' : 'Coming Soon'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

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
