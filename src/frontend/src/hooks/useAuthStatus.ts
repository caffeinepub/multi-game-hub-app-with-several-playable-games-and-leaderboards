import { useInternetIdentity } from './useInternetIdentity';

export function useAuthStatus() {
  const { identity, loginStatus } = useInternetIdentity();
  
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const principal = identity?.getPrincipal().toString() || '';
  const shortPrincipal = principal ? `${principal.slice(0, 5)}...${principal.slice(-3)}` : '';

  return {
    isAuthenticated,
    principal,
    shortPrincipal,
    loginStatus,
  };
}
