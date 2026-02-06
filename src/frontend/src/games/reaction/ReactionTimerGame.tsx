import { useState, useEffect, useRef } from 'react';
import { Zap, RotateCcw, Trophy } from 'lucide-react';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { useSubmitScore } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface ReactionTimerGameProps {
  gameId: string;
}

type GameState = 'idle' | 'waiting' | 'ready' | 'clicked' | 'tooEarly';

export default function ReactionTimerGame({ gameId }: ReactionTimerGameProps) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated } = useAuthStatus();
  const submitScore = useSubmitScore();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    
    const delay = 2000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      setGameState('tooEarly');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    if (gameState === 'ready') {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setGameState('clicked');
      
      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
    }
  };

  const handleRestart = () => {
    setGameState('idle');
    setReactionTime(null);
  };

  const handleSubmitScore = async () => {
    if (!isAuthenticated || !reactionTime) {
      toast.error('Please login to submit your score');
      return;
    }

    const score = Math.max(1, Math.floor(10000 / reactionTime));
    
    try {
      await submitScore.mutateAsync({ gameId, score });
      toast.success('Score submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit score');
      console.error('Score submission error:', error);
    }
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'waiting':
        return 'bg-destructive/20';
      case 'ready':
        return 'bg-primary/20';
      case 'tooEarly':
        return 'bg-destructive/30';
      default:
        return 'bg-muted/30';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-2">
          <Zap className="w-8 h-8 text-primary" />
          Reaction Timer
        </CardTitle>
        <CardDescription>
          Test your reflexes! Click as fast as you can when the screen turns green.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">How to Play:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Click "Start" to begin</li>
            <li>• Wait for the screen to turn green</li>
            <li>• Click as fast as you can when it turns green</li>
            <li>• Don't click too early or you'll have to restart!</li>
          </ul>
        </div>

        <div
          className={`min-h-64 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${getBackgroundColor()}`}
          onClick={handleClick}
        >
          <div className="text-center p-8">
            {gameState === 'idle' && (
              <div>
                <Zap className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl font-semibold mb-2">Ready to test your reflexes?</p>
                <p className="text-muted-foreground">Click "Start" below to begin</p>
              </div>
            )}
            {gameState === 'waiting' && (
              <div>
                <p className="text-2xl font-bold text-destructive">Wait...</p>
                <p className="text-muted-foreground mt-2">Screen will turn green soon</p>
              </div>
            )}
            {gameState === 'ready' && (
              <div>
                <p className="text-3xl font-bold text-primary animate-pulse">CLICK NOW!</p>
              </div>
            )}
            {gameState === 'clicked' && reactionTime && (
              <div>
                <p className="text-xl font-semibold mb-2">Your reaction time:</p>
                <p className="text-5xl font-bold text-primary">{reactionTime}ms</p>
                {bestTime && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Best: {bestTime}ms
                  </p>
                )}
              </div>
            )}
            {gameState === 'tooEarly' && (
              <div>
                <p className="text-2xl font-bold text-destructive mb-2">Too early!</p>
                <p className="text-muted-foreground">Wait for the green signal</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          {(gameState === 'idle' || gameState === 'tooEarly') && (
            <Button onClick={startGame} className="gap-2">
              <Zap className="w-4 h-4" />
              Start
            </Button>
          )}
          {gameState === 'clicked' && (
            <>
              <Button onClick={handleRestart} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
              <Button 
                onClick={handleSubmitScore} 
                disabled={submitScore.isPending || !isAuthenticated}
                className="gap-2"
              >
                <Trophy className="w-4 h-4" />
                {submitScore.isPending ? 'Submitting...' : 'Submit Score'}
              </Button>
            </>
          )}
        </div>

        {!isAuthenticated && gameState === 'clicked' && (
          <Alert>
            <AlertDescription>
              Login to save your score to the leaderboard!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
