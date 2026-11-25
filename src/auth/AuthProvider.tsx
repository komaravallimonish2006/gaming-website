import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth0Provider as RealAuth0Provider, useAuth0 as useRealAuth0 } from '@auth0/auth0-react';

export interface NexusUser {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  nickname?: string;
  isGuest?: boolean;
}

interface NexusAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: NexusUser | null;
  isAuth0Configured: boolean;
  login: () => Promise<void>;
  logout: () => void;
  loginAsGuest: (username?: string) => void;
  error: Error | null;
}

const NexusAuthContext = createContext<NexusAuthContextType | null>(null);

// Inner component when Real Auth0 is configured
function RealAuth0Bridge({ children, isConfigured }: { children: React.ReactNode; isConfigured: boolean }) {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout, error } = useRealAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
    } catch (err) {
      console.error('Auth0 login redirect error:', err);
    }
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const nexusUser: NexusUser | null = user ? {
    name: user.name || user.nickname || 'Nexus Operative',
    email: user.email,
    picture: user.picture || 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&q=80',
    sub: user.sub,
    nickname: user.nickname
  } : null;

  return (
    <NexusAuthContext.Provider
      value={{
        isAuthenticated: !!isAuthenticated,
        isLoading,
        user: nexusUser,
        isAuth0Configured: isConfigured,
        login: handleLogin,
        logout: handleLogout,
        loginAsGuest: () => {},
        error: error || null
      }}
    >
      {children}
    </NexusAuthContext.Provider>
  );
}

// Fallback Provider when Auth0 domain/client are not yet specified in .env
function FallbackAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<NexusUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Purge any insecure legacy plaintext passwords stored previously
    localStorage.removeItem('nexus_users');

    // Check for existing safe session
    const saved = localStorage.getItem('nexus_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('nexus_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async () => {
    // Direct user to configure Auth0 or login as guest
    const guestUser: NexusUser = {
      name: 'Agent_Zero (Demo Operative)',
      email: 'agent0@nexus-gaming.net',
      picture: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&q=80',
      sub: 'demo|007',
      isGuest: true
    };
    setUser(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem('nexus_session', JSON.stringify(guestUser));
  };

  const loginAsGuest = (customName?: string) => {
    const guestUser: NexusUser = {
      name: customName || 'Player One',
      email: 'guest@nexus-gaming.net',
      picture: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=120&q=80',
      sub: `guest|${Date.now()}`,
      isGuest: true
    };
    setUser(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem('nexus_session', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nexus_session');
    localStorage.removeItem('nexus_currentUser');
  };

  return (
    <NexusAuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        isAuth0Configured: false,
        login,
        logout,
        loginAsGuest,
        error: null
      }}
    >
      {children}
    </NexusAuthContext.Provider>
  );
}

export function NexusAuthProvider({ children }: { children: React.ReactNode }) {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  const isConfigured = Boolean(
    domain && 
    clientId && 
    !domain.includes('YOUR_AUTH0') && 
    !clientId.includes('YOUR_AUTH0')
  );

  if (isConfigured && domain && clientId) {
    return (
      <RealAuth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: typeof window !== 'undefined' ? window.location.origin : ''
        }}
        cacheLocation="localstorage"
      >
        <RealAuth0Bridge isConfigured={true}>{children}</RealAuth0Bridge>
      </RealAuth0Provider>
    );
  }

  return <FallbackAuthProvider>{children}</FallbackAuthProvider>;
}

export function useNexusAuth() {
  const context = useContext(NexusAuthContext);
  if (!context) {
    throw new Error('useNexusAuth must be used within a NexusAuthProvider');
  }
  return context;
}
