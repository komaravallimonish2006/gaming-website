import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Nexus Error Boundary caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-6 text-white font-sans">
          <div className="max-w-lg w-full bg-white/5 border border-red-500/30 rounded-2xl p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(239,68,68,0.2)] text-center relative overflow-hidden">
            <div className="w-16 h-16 mx-auto bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400 mb-6 shadow-inner">
              <AlertTriangle className="w-8 h-8 animate-pulse" />
            </div>

            <h2 className="text-2xl font-black tracking-tight text-white mb-2">
              SYSTEM ANOMALY DETECTED
            </h2>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              The neural link encountered an unexpected glitch. Our automated recovery routines have contained the fault.
            </p>

            {this.state.error && (
              <div className="text-left font-mono text-xs bg-black/60 p-4 rounded-xl border border-white/10 text-red-300 mb-6 overflow-x-auto max-h-36">
                <span className="text-gray-500">// Stack trace</span>
                <p className="mt-1">{this.state.error.toString()}</p>
              </div>
            )}

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={this.handleReload}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent-blue text-black font-bold text-sm rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <RefreshCw className="w-4 h-4" />
                Reboot System
              </button>
              <a
                href="/"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-medium text-sm rounded-full hover:bg-white/20 transition-all border border-white/10"
              >
                <Home className="w-4 h-4" />
                Nexus Central
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
