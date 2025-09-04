'use client';

import { useEffect, useState } from 'react';

interface OglDebugInfo {
  isLoaded: boolean;
  error?: string;
  version?: string;
  exports?: string[];
  webglSupport: boolean;
}

export default function OglDebug() {
  const [debugInfo, setDebugInfo] = useState<OglDebugInfo>({
    isLoaded: false,
    webglSupport: false
  });

  useEffect(() => {
    const checkOgl = async () => {
      // Check WebGL support
      const canvas = document.createElement('canvas');
      const webglSupport = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      
      try {
        const OGL = await import('ogl');
        const exports = Object.keys(OGL).filter(key => typeof OGL[key as keyof typeof OGL] === 'function');
        
        setDebugInfo({
          isLoaded: true,
          exports: exports.slice(0, 10), // First 10 exports
          webglSupport,
          version: '1.0.11' // From package.json
        });
      } catch (error) {
        setDebugInfo({
          isLoaded: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          webglSupport
        });
      }
    };

    checkOgl();
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show debug info in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-sm">
      <h3 className="font-bold mb-2">OGL Debug Info</h3>
      <div className="space-y-1">
        <div>WebGL: {debugInfo.webglSupport ? '✅ Supported' : '❌ Not supported'}</div>
        <div>OGL: {debugInfo.isLoaded ? '✅ Loaded' : '❌ Failed'}</div>
        {debugInfo.version && <div>Version: {debugInfo.version}</div>}
        {debugInfo.error && <div className="text-red-400">Error: {debugInfo.error}</div>}
        {debugInfo.exports && (
          <div>
            <div>Exports: {debugInfo.exports.join(', ')}</div>
          </div>
        )}
      </div>
    </div>
  );
}