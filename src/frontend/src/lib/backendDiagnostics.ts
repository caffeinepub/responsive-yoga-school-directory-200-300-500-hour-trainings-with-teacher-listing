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

/**
 * Normalizes an unknown error into a structured shape with message and optional code.
 */
export function normalizeError(error: unknown): { message: string; code?: string } {
  if (error instanceof Error) {
    return { message: error.message };
  }
  if (typeof error === 'string') {
    return { message: error };
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return { 
      message: String(error.message),
      code: 'code' in error ? String(error.code) : undefined
    };
  }
  return { message: 'Unknown error occurred' };
}

/**
 * Determines if a backend error is non-fatal for anonymous browsing.
 * These errors should result in empty state UI rather than error banners.
 */
export function isNonFatalAnonymousBrowseError(error: unknown): boolean {
  const normalized = normalizeError(error);
  const message = normalized.message.toLowerCase();
  
  // Known non-fatal patterns for anonymous browsing
  const nonFatalPatterns = [
    'unauthorized',
    'not authenticated',
    'anonymous',
    'permission denied',
    'access denied',
  ];
  
  return nonFatalPatterns.some(pattern => message.includes(pattern));
}
