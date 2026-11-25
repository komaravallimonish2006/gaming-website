import React from 'react';
import ReactDOM from 'react-dom/client';
import { NexusAuthProvider } from './auth/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import RateLimitShield from './components/RateLimitShield';
import CookieBanner from './components/CookieBanner';
import { initAnalytics } from './utils/analytics';
import './index.css';

// Initialize privacy-friendly Vercel Web Analytics
initAnalytics();

// Mount the navbar and global security shields into the navbar-root div on static HTML pages
const rootElement = document.getElementById('navbar-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <NexusAuthProvider>
          <CustomCursor />
          <Navbar />
          <RateLimitShield />
          <CookieBanner />
        </NexusAuthProvider>
      </ErrorBoundary>
    </React.StrictMode>,
  );
}
