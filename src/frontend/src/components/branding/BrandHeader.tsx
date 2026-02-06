export default function BrandHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="flex justify-center mb-4">
        <img 
          src="/assets/generated/game-hub-logo.dim_512x512.png" 
          alt="GameHub Logo" 
          className="w-24 h-24 object-contain"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        Welcome to GameHub
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Play amazing games, compete on leaderboards, and have fun!
      </p>
    </div>
  );
}
