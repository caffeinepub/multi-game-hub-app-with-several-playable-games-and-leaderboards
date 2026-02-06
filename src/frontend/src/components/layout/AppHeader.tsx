import { Gamepad2 } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import { useGetCallerUserProfile } from '../../hooks/useQueries';

export default function AppHeader() {
  const { isAuthenticated, shortPrincipal } = useAuthStatus();
  const { data: userProfile } = useGetCallerUserProfile();

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors"
          >
            <Gamepad2 className="w-7 h-7" />
            <span>GameHub</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Games
            </button>
            <button
              onClick={() => navigate('/leaderboards')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Leaderboards
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && userProfile && (
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Welcome,</span>
              <span className="font-medium text-foreground">{userProfile.name}</span>
              <span className="text-xs text-muted-foreground">({shortPrincipal})</span>
            </div>
          )}
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
