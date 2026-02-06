import { useState } from 'react';
import { X, Circle, RotateCcw, Trophy } from 'lucide-react';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { useSubmitScore } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface TicTacToeGameProps {
  gameId: string;
}

type Player = 'X' | 'O' | null;

export default function TicTacToeGame({ gameId }: TicTacToeGameProps) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [moves, setMoves] = useState(0);
  const { isAuthenticated } = useAuthStatus();
  const submitScore = useSubmitScore();

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (newBoard: Player[]): Player | 'draw' | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    if (newBoard.every(cell => cell !== null)) {
      return 'draw';
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setMoves(moves + 1);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setMoves(0);
  };

  const handleSubmitScore = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to submit your score');
      return;
    }

    const score = winner === 'X' ? 100 : winner === 'O' ? 50 : 25;
    
    try {
      await submitScore.mutateAsync({ gameId, score });
      toast.success('Score submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit score');
      console.error('Score submission error:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">Tic-Tac-Toe</CardTitle>
        <CardDescription>
          Get three in a row to win! Play against yourself or a friend.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">How to Play:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Players take turns placing X and O on the board</li>
            <li>• Get three in a row (horizontal, vertical, or diagonal) to win</li>
            <li>• If all squares are filled with no winner, it's a draw</li>
          </ul>
        </div>

        {winner && (
          <Alert className="bg-primary/10 border-primary">
            <Trophy className="h-4 w-4" />
            <AlertDescription className="font-semibold">
              {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}
            </AlertDescription>
          </Alert>
        )}

        {!winner && (
          <div className="text-center text-lg font-semibold">
            Current Player: <span className="text-primary">{currentPlayer}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !!winner}
              className="aspect-square bg-card border-2 border-border rounded-lg hover:bg-accent transition-colors disabled:cursor-not-allowed flex items-center justify-center text-4xl font-bold"
            >
              {cell === 'X' && <X className="w-12 h-12 text-primary" />}
              {cell === 'O' && <Circle className="w-12 h-12 text-accent" />}
            </button>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            New Game
          </Button>
          {winner && winner !== 'draw' && (
            <Button 
              onClick={handleSubmitScore} 
              disabled={submitScore.isPending || !isAuthenticated}
              className="gap-2"
            >
              <Trophy className="w-4 h-4" />
              {submitScore.isPending ? 'Submitting...' : 'Submit Score'}
            </Button>
          )}
        </div>

        {!isAuthenticated && winner && winner !== 'draw' && (
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
