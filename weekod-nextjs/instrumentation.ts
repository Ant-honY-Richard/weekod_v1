// Disable all tracing and telemetry for Windows compatibility
export async function register() {
  // Disable OpenTelemetry SDK
  process.env.OTEL_SDK_DISABLED = 'true';
  process.env.NEXT_OTEL_VERBOSE = '0';
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT = '';
  
  // Override trace functions to prevent file creation
  if (typeof globalThis !== 'undefined') {
    // @ts-ignore
    globalThis.__NEXT_PRIVATE_TRACE_DISABLED = true;
  }
  
  console.log('✅ Instrumentation: Tracing disabled for Windows compatibility');
}