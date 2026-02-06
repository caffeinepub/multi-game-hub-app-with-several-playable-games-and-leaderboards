import { Clock, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ComingSoonGameProps {
  gameTitle: string;
}

export default function ComingSoonGame({ gameTitle }: ComingSoonGameProps) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-3xl">{gameTitle}</CardTitle>
        <CardDescription>This game is under development</CardDescription>
      </CardHeader>
      <CardContent className="py-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Clock className="w-24 h-24 text-muted-foreground/30" />
            <Sparkles className="w-8 h-8 text-primary absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We're working hard to bring you this exciting game. Check back soon for updates!
        </p>
      </CardContent>
    </Card>
  );
}
