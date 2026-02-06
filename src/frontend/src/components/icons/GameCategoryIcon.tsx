interface GameCategoryIconProps {
  position: number;
  className?: string;
}

export default function GameCategoryIcon({ position, className = '' }: GameCategoryIconProps) {
  const spriteSize = 1024;
  const iconSize = spriteSize / 3;
  const row = Math.floor(position / 3);
  const col = position % 3;
  const x = col * iconSize;
  const y = row * iconSize;

  return (
    <div 
      className={`w-16 h-16 ${className}`}
      style={{
        backgroundImage: 'url(/assets/generated/game-category-icons-sprite.dim_1024x1024.png)',
        backgroundPosition: `-${x}px -${y}px`,
        backgroundSize: `${spriteSize}px ${spriteSize}px`,
      }}
    />
  );
}
