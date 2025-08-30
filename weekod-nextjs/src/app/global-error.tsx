'use client';

import Link from 'next/link';

// Global error boundary for the App Router.
// This catches errors thrown during initial render/hydration of layout or page
// and prevents the dev client from showing "missing required error components".
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Do not log too aggressively in production; Next.js will log server-side.
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error('GlobalError:', error);
  }

  return (
    <html>
      <body className="bg-[#0A0A12] text-white min-h-screen">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-2xl mx-auto bg-[#0F0F1A] border border-[#00F3FF]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D4F]" />
              <h2 className="text-xl sm:text-2xl font-bold">Something went wrong</h2>
            </div>
            <p className="text-gray-300 mb-4">
              An unexpected error occurred while rendering this page. You can try again or go back to the homepage.
            </p>
            {error?.digest && (
              <p className="text-xs text-gray-500 mb-4">Error ID: {error.digest}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#00F3FF] text-[#0A0A12] font-bold hover:bg-[#00D1E0]"
              >
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#00F3FF]/30 text-white hover:bg-[#111425]"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
