export interface GameInfo {
  id: string;
  title: string;
  description: string;
  category: 'puzzle' | 'arcade' | 'strategy' | 'word' | 'card' | 'math';
  isPlayable: boolean;
  iconPosition: number;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const GAME_REGISTRY: GameInfo[] = [
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    description: 'Classic strategy game. Get three in a row to win!',
    category: 'strategy',
    isPlayable: true,
    iconPosition: 2,
    tags: ['classic', 'multiplayer'],
    difficulty: 'easy'
  },
  {
    id: 'reaction-timer',
    title: 'Reaction Timer',
    description: 'Test your reflexes! Click as fast as you can when the signal appears.',
    category: 'arcade',
    isPlayable: true,
    iconPosition: 1,
    tags: ['speed', 'reflex'],
    difficulty: 'medium'
  },
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    description: 'Unscramble the letters to form the correct word. Beat the clock!',
    category: 'word',
    isPlayable: true,
    iconPosition: 3,
    tags: ['vocabulary', 'timed'],
    difficulty: 'medium'
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Find matching pairs in this classic memory card game.',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['memory', 'classic'],
    difficulty: 'easy'
  },
  {
    id: 'number-crunch',
    title: 'Number Crunch',
    description: 'Solve math problems quickly to rack up points!',
    category: 'math',
    isPlayable: false,
    iconPosition: 5,
    tags: ['math', 'speed'],
    difficulty: 'hard'
  },
  {
    id: 'card-flip',
    title: 'Card Flip',
    description: 'A fast-paced card matching game with a twist.',
    category: 'card',
    isPlayable: false,
    iconPosition: 4,
    tags: ['cards', 'speed'],
    difficulty: 'medium'
  },
  {
    id: 'emoji-chaos',
    title: 'Emoji Chaos',
    description: 'Match the emoji expressions before time runs out! Hilarious and funny reactions guaranteed.',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['funny', 'emoji'],
    difficulty: 'easy'
  },
  {
    id: 'impossible-maze',
    title: 'Impossible Maze',
    description: 'Navigate through the hardest maze ever created. Only 1% can finish!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['hard', 'challenge'],
    difficulty: 'hard'
  },
  {
    id: 'silly-sounds',
    title: 'Silly Sounds',
    description: 'Match the funny sound effects to the right animals. Prepare to laugh!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'audio'],
    difficulty: 'easy'
  },
  {
    id: 'brain-buster',
    title: 'Brain Buster',
    description: 'Extremely hard logic puzzles that will make your brain hurt. Not for the faint of heart!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['hard', 'logic'],
    difficulty: 'hard'
  },
  {
    id: 'dance-off',
    title: 'Dance Off',
    description: 'Copy the funny dance moves in this hilarious rhythm game!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'rhythm'],
    difficulty: 'medium'
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'The hardest speed challenge ever. Can you keep up with the insane pace?',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['hard', 'speed'],
    difficulty: 'hard'
  },
  {
    id: 'joke-master',
    title: 'Joke Master',
    description: 'Complete the punchlines to classic jokes. Funny and entertaining!',
    category: 'word',
    isPlayable: false,
    iconPosition: 3,
    tags: ['funny', 'jokes'],
    difficulty: 'easy'
  },
  {
    id: 'ultimate-trivia',
    title: 'Ultimate Trivia',
    description: 'The hardest trivia questions from every category. Expert level only!',
    category: 'word',
    isPlayable: false,
    iconPosition: 3,
    tags: ['hard', 'trivia'],
    difficulty: 'hard'
  },
  {
    id: 'wacky-physics',
    title: 'Wacky Physics',
    description: 'Solve puzzles with hilarious and funny physics that defy logic!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['funny', 'physics'],
    difficulty: 'medium'
  },
  {
    id: 'ninja-reflexes',
    title: 'Ninja Reflexes',
    description: 'Insanely hard reflex challenges that require lightning-fast reactions!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['hard', 'reflex'],
    difficulty: 'hard'
  },
  {
    id: 'meme-match',
    title: 'Meme Match',
    description: 'Match the funny memes to their captions. Internet culture at its finest!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['funny', 'memes'],
    difficulty: 'easy'
  },
  {
    id: 'chess-master',
    title: 'Chess Master',
    description: 'Play against an extremely hard AI that never loses. Good luck!',
    category: 'strategy',
    isPlayable: false,
    iconPosition: 2,
    tags: ['hard', 'classic'],
    difficulty: 'hard'
  },
  {
    id: 'pet-parade',
    title: 'Pet Parade',
    description: 'Dress up pets in funny costumes and watch them parade around!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'pets'],
    difficulty: 'easy'
  },
  {
    id: 'sudoku-extreme',
    title: 'Sudoku Extreme',
    description: 'The hardest Sudoku puzzles ever created. Only masters need apply!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['hard', 'logic'],
    difficulty: 'hard'
  },
  {
    id: 'pun-factory',
    title: 'Pun Factory',
    description: 'Create and rate funny puns in this hilarious word game!',
    category: 'word',
    isPlayable: false,
    iconPosition: 3,
    tags: ['funny', 'creative'],
    difficulty: 'easy'
  },
  {
    id: 'precision-platformer',
    title: 'Precision Platformer',
    description: 'Extremely hard platforming that requires pixel-perfect jumps!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['hard', 'platformer'],
    difficulty: 'hard'
  },
  {
    id: 'face-maker',
    title: 'Face Maker',
    description: 'Create the funniest faces possible with wacky features!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['funny', 'creative'],
    difficulty: 'easy'
  },
  {
    id: 'poker-pro',
    title: 'Poker Pro',
    description: 'Play against hard AI opponents who know every trick in the book!',
    category: 'card',
    isPlayable: false,
    iconPosition: 4,
    tags: ['hard', 'strategy'],
    difficulty: 'hard'
  },
  {
    id: 'silly-simulator',
    title: 'Silly Simulator',
    description: 'Simulate the most ridiculous and funny scenarios imaginable!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'simulation'],
    difficulty: 'easy'
  },
  {
    id: 'calculus-challenge',
    title: 'Calculus Challenge',
    description: 'Solve incredibly hard calculus problems under time pressure!',
    category: 'math',
    isPlayable: false,
    iconPosition: 5,
    tags: ['hard', 'math'],
    difficulty: 'hard'
  },
  {
    id: 'comedy-club',
    title: 'Comedy Club',
    description: 'Perform funny stand-up routines and get audience reactions!',
    category: 'word',
    isPlayable: false,
    iconPosition: 3,
    tags: ['funny', 'performance'],
    difficulty: 'medium'
  },
  {
    id: 'boss-rush',
    title: 'Boss Rush',
    description: 'Face the hardest bosses back-to-back with no breaks!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['hard', 'combat'],
    difficulty: 'hard'
  },
  {
    id: 'animal-antics',
    title: 'Animal Antics',
    description: 'Watch animals do funny things and guess what happens next!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['funny', 'animals'],
    difficulty: 'easy'
  },
  {
    id: 'rubiks-revenge',
    title: "Rubik's Revenge",
    description: 'Solve a 5x5x5 cube in record time. Extremely hard!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['hard', 'spatial'],
    difficulty: 'hard'
  },
  {
    id: 'laugh-track',
    title: 'Laugh Track',
    description: 'Add funny laugh tracks to videos at the perfect moments!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'timing'],
    difficulty: 'easy'
  },
  {
    id: 'dark-souls-math',
    title: 'Dark Souls Math',
    description: 'Math problems so hard they make Dark Souls look easy!',
    category: 'math',
    isPlayable: false,
    iconPosition: 5,
    tags: ['hard', 'math'],
    difficulty: 'hard'
  },
  {
    id: 'dad-jokes',
    title: 'Dad Jokes Deluxe',
    description: 'The ultimate collection of groan-worthy funny dad jokes!',
    category: 'word',
    isPlayable: false,
    iconPosition: 3,
    tags: ['funny', 'jokes'],
    difficulty: 'easy'
  },
  {
    id: 'bullet-hell',
    title: 'Bullet Hell',
    description: 'Dodge thousands of projectiles in this insanely hard shooter!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['hard', 'shooter'],
    difficulty: 'hard'
  },
  {
    id: 'clown-college',
    title: 'Clown College',
    description: 'Learn funny clown tricks and perform hilarious acts!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'performance'],
    difficulty: 'medium'
  },
  {
    id: 'grandmaster-go',
    title: 'Grandmaster Go',
    description: 'Play Go against an AI that rivals world champions. Extremely hard!',
    category: 'strategy',
    isPlayable: false,
    iconPosition: 2,
    tags: ['hard', 'strategy'],
    difficulty: 'hard'
  },
  {
    id: 'silly-walks',
    title: 'Silly Walks',
    description: 'Create the funniest walking animations in this hilarious game!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'animation'],
    difficulty: 'easy'
  },
  {
    id: 'quantum-chess',
    title: 'Quantum Chess',
    description: 'Chess with quantum mechanics. Mind-bendingly hard!',
    category: 'strategy',
    isPlayable: false,
    iconPosition: 2,
    tags: ['hard', 'quantum'],
    difficulty: 'hard'
  },
  {
    id: 'prank-master',
    title: 'Prank Master',
    description: 'Pull off funny pranks without getting caught!',
    category: 'strategy',
    isPlayable: false,
    iconPosition: 2,
    tags: ['funny', 'stealth'],
    difficulty: 'medium'
  },
  {
    id: 'kaizo-mario',
    title: 'Kaizo Mario',
    description: 'Platform through the hardest Mario levels ever designed!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['hard', 'platformer'],
    difficulty: 'hard'
  },
  {
    id: 'whoopee-cushion',
    title: 'Whoopee Cushion',
    description: 'Time your funny sound effects perfectly for maximum laughs!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'timing'],
    difficulty: 'easy'
  },
  {
    id: 'bridge-builder-pro',
    title: 'Bridge Builder Pro',
    description: 'Build bridges with hard physics constraints and limited resources!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['hard', 'engineering'],
    difficulty: 'hard'
  },
  {
    id: 'cartoon-physics',
    title: 'Cartoon Physics',
    description: 'Solve puzzles using funny cartoon logic that breaks reality!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['funny', 'physics'],
    difficulty: 'medium'
  },
  {
    id: 'speedrun-gauntlet',
    title: 'Speedrun Gauntlet',
    description: 'Complete hard challenges in record time. Speedrunners only!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['hard', 'speed'],
    difficulty: 'hard'
  },
  {
    id: 'improv-comedy',
    title: 'Improv Comedy',
    description: 'Create funny scenes on the spot with random prompts!',
    category: 'word',
    isPlayable: false,
    iconPosition: 3,
    tags: ['funny', 'creative'],
    difficulty: 'medium'
  },
  {
    id: 'no-hit-run',
    title: 'No Hit Run',
    description: 'Beat the entire game without taking damage. Impossibly hard!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['hard', 'challenge'],
    difficulty: 'hard'
  },
  {
    id: 'meme-generator',
    title: 'Meme Generator',
    description: 'Create the funniest memes and share them with friends!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['funny', 'creative'],
    difficulty: 'easy'
  },
  {
    id: 'blindfolded-tetris',
    title: 'Blindfolded Tetris',
    description: 'Play Tetris without seeing the pieces. Insanely hard!',
    category: 'puzzle',
    isPlayable: false,
    iconPosition: 0,
    tags: ['hard', 'memory'],
    difficulty: 'hard'
  },
  {
    id: 'tickle-fight',
    title: 'Tickle Fight',
    description: 'A funny multiplayer game where you tickle opponents to win!',
    category: 'arcade',
    isPlayable: false,
    iconPosition: 1,
    tags: ['funny', 'multiplayer'],
    difficulty: 'easy'
  }
];

export function getGameById(id: string): GameInfo | undefined {
  return GAME_REGISTRY.find(game => game.id === id);
}

// Validation helper (development only)
function validateGameRegistry() {
  if (import.meta.env.DEV) {
    // Check max length
    if (GAME_REGISTRY.length > 50) {
      console.warn(
        `⚠️ Game Registry Warning: Registry contains ${GAME_REGISTRY.length} games, which exceeds the maximum of 50. Please reduce the number of games.`
      );
    }

    // Check for duplicate IDs
    const ids = GAME_REGISTRY.map(game => game.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    
    if (duplicates.length > 0) {
      console.warn(
        `⚠️ Game Registry Warning: Duplicate game IDs detected: ${[...new Set(duplicates)].join(', ')}. Each game must have a unique ID.`
      );
    }

    // Log success if valid
    if (GAME_REGISTRY.length <= 50 && duplicates.length === 0) {
      console.log(`✅ Game Registry: ${GAME_REGISTRY.length} games registered successfully.`);
    }
  }
}

// Run validation
validateGameRegistry();
