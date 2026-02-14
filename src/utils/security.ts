/**
 * Security utilities – no data leak, XSS prevention, safe storage.
 * Use for any user-generated or sensitive data handling.
 */

/** Escape string for safe display in HTML (prevents XSS if ever used in markup). */
export function sanitizeForDisplay(raw: string): string {
  if (typeof raw !== 'string') return ''
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  return raw.replace(/[&<>"'/]/g, (ch) => map[ch] ?? ch)
}

/** Session timeout in ms (15 min). Log out after this period of inactivity. */
export const SESSION_TIMEOUT_MS = 15 * 60 * 1000

/** Keys that might hold sensitive data – clear on logout. */
const SENSITIVE_KEYS = ['nexora_token', 'nexora_refresh', 'nexora_user', 'nexora_role']

/** Clear any sensitive data from storage. Call on logout. */
export function clearSensitiveStorage(): void {
  try {
    for (const key of SENSITIVE_KEYS) {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    }
  } catch {
    // ignore storage errors (private mode, etc.)
  }
}

/** Validate role is strictly doctor (no leak for patient). */
export function isDoctorRole(role: string | undefined): role is 'doctor' {
  return role === 'doctor'
}

/** Validate role is strictly patient. */
export function isPatientRole(role: string | undefined): role is 'patient' {
  return role === 'patient'
}
