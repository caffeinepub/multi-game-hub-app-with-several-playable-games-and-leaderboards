import { useState, useEffect } from 'react';
import { Shuffle, RotateCcw, Trophy, Clock } from 'lucide-react';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { useSubmitScore } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface WordScrambleGameProps {
  gameId: string;
}

const WORDS = [
  { word: 'JAVASCRIPT', hint: 'Popular programming language' },
  { word: 'COMPUTER', hint: 'Electronic device' },
  { word: 'KEYBOARD', hint: 'Input device' },
  { word: 'INTERNET', hint: 'Global network' },
  { word: 'ALGORITHM', hint: 'Step-by-step procedure' },
  { word: 'DATABASE', hint: 'Organized data storage' },
  { word: 'FUNCTION', hint: 'Reusable code block' },
  { word: 'VARIABLE', hint: 'Data container' },
  { word: 'BLOCKCHAIN', hint: 'Distributed ledger' },
  { word: 'ENCRYPTION', hint: 'Data security method' }
];

export default function WordScrambleGame({ gameId }: WordScrambleGameProps) {
  const [currentWord, setCurrentWord] = useState(WORDS[0]);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { isAuthenticated } = useAuthStatus();
  const submitScoreMutation = useSubmitScore();

  const scrambleWord = (word: string): string => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };

  const startNewRound = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord.word));
    setUserGuess('');
  };

  const startGame = () => {
    setScore(0);
    setAttempts(0);
    setTimeLeft(60);
    setGameActive(true);
    setGameOver(false);
    startNewRound();
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      setGameActive(false);
      setGameOver(true);
    }
  }, [gameActive, timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameActive) return;

    setAttempts(attempts + 1);

    if (userGuess.toUpperCase() === currentWord.word) {
      const points = Math.max(10, 50 - attempts * 5);
      setScore(score + points);
      toast.success(`Correct! +${points} points`);
      startNewRound();
      setAttempts(0);
    } else {
      toast.error('Incorrect! Try again');
    }
  };

  const handleSubmitScore = async () => {
    if (!isAuthenticated || score === 0) {
      toast.error('Please login to submit your score');
      return;
    }

    try {
      await submitScoreMutation.mutateAsync({ gameId, score });
      toast.success('Score submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit score');
      console.error('Score submission error:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-2">
          <Shuffle className="w-8 h-8 text-primary" />
          Word Scramble
        </CardTitle>
        <CardDescription>
          Unscramble the letters to form the correct word before time runs out!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">How to Play:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Unscramble the letters to form a word</li>
            <li>• Use the hint to help you guess</li>
            <li>• You have 60 seconds to score as many points as possible</li>
            <li>• Fewer attempts = more points per word!</li>
          </ul>
        </div>

        {!gameActive && !gameOver && (
          <div className="text-center py-8">
            <Shuffle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold mb-4">Ready to unscramble some words?</p>
            <Button onClick={startGame} size="lg" className="gap-2">
              <Shuffle className="w-4 h-4" />
              Start Game
            </Button>
          </div>
        )}

        {gameActive && (
          <>
            <div className="flex justify-between items-center bg-accent/20 p-4 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-2xl font-bold text-primary">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Time Left</p>
                <p className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {timeLeft}s
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Attempts</p>
                <p className="text-2xl font-bold">{attempts}</p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Hint:</p>
                <p className="text-lg font-medium">{currentWord.hint}</p>
              </div>
              
              <div className="bg-primary/10 p-6 rounded-lg">
                <p className="text-4xl font-bold tracking-widest text-primary">
                  {scrambledWord}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="text"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  placeholder="Type your answer..."
                  className="text-center text-lg"
                  autoFocus
                />
                <Button type="submit" className="w-full">
                  Submit Answer
                </Button>
              </form>
            </div>
          </>
        )}

        {gameOver && (
          <>
            <Alert className="bg-primary/10 border-primary">
              <Trophy className="h-4 w-4" />
              <AlertDescription className="font-semibold">
                Game Over! Final Score: {score}
              </AlertDescription>
            </Alert>

            <div className="flex gap-3 justify-center">
              <Button onClick={startGame} variant="outline" className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
              {score > 0 && (
                <Button 
                  onClick={handleSubmitScore} 
                  disabled={submitScoreMutation.isPending || !isAuthenticated}
                  className="gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  {submitScoreMutation.isPending ? 'Submitting...' : 'Submit Score'}
                </Button>
              )}
            </div>

            {!isAuthenticated && score > 0 && (
              <Alert>
                <AlertDescription>
                  Login to save your score to the leaderboard!
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
