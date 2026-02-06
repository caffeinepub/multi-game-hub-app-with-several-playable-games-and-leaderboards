import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import AppLayout from './components/layout/AppLayout';
import HubPage from './pages/HubPage';
import GameShellPage from './pages/GameShellPage';
import AllLeaderboardsPage from './pages/AllLeaderboardsPage';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import { Toaster } from '@/components/ui/sonner';

type Route = 'hub' | 'game' | 'leaderboards';

interface RouteState {
  route: Route;
  gameId?: string;
}

function App() {
  const [routeState, setRouteState] = useState<RouteState>({ route: 'hub' });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      const [path] = hash.split('?');
      
      if (path === '/' || path === '') {
        setRouteState({ route: 'hub' });
      } else if (path.startsWith('/game/')) {
        const gameId = path.split('/')[2];
        setRouteState({ route: 'game', gameId });
      } else if (path === '/leaderboards') {
        setRouteState({ route: 'leaderboards' });
      } else {
        setRouteState({ route: 'hub' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (routeState.route) {
      case 'game':
        return <GameShellPage gameId={routeState.gameId || ''} />;
      case 'leaderboards':
        return <AllLeaderboardsPage />;
      case 'hub':
      default:
        return <HubPage />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AppLayout>
        {renderPage()}
      </AppLayout>
      <ProfileSetupDialog />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
