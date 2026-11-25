import React from 'react';
import { NexusAuthProvider } from './auth/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import ClientsTicker from './components/ClientsTicker';
import Features from './components/Features';
import GamesGallery from './components/GamesGallery';
import About from './components/About';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import RateLimitShield from './components/RateLimitShield';

export default function App() {
  return (
    <ErrorBoundary>
      <NexusAuthProvider>
        <div className="bg-[#070b19] min-h-screen font-sans text-white selection:bg-accent-blue/30 selection:text-white overflow-x-hidden">
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <ClientsTicker />
            <Features />
            <GamesGallery />
            <About />
          </main>
          <Footer />
          <CookieBanner />
          <RateLimitShield />
        </div>
      </NexusAuthProvider>
    </ErrorBoundary>
  );
}
