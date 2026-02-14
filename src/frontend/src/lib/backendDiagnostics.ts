/**
 * Diagnostic helper for backend call failures.
 * Logs structured information to help debug backend communication issues.
 */

interface BackendCallDiagnostics {
  method: string;
  error: unknown;
  hasActor: boolean;
  timestamp?: string;
}

/**
 * Logs a structured diagnostic message for a failed backend call.
 * @param diagnostics - Information about the failed backend call
 */
export function logBackendCallFailure(diagnostics: BackendCallDiagnostics): void {
  const timestamp = diagnostics.timestamp || new Date().toISOString();
  
  console.error(
    `[Backend Call Failed] ${diagnostics.method}`,
    {
      timestamp,
      method: diagnostics.method,
      hasActor: diagnostics.hasActor,
      error: diagnostics.error,
    }
  );
}
