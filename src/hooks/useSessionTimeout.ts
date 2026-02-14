import { useEffect, useRef, useCallback } from 'react'
import { SESSION_TIMEOUT_MS } from '../utils/security'

/**
 * Logs out after SESSION_TIMEOUT_MS of inactivity.
 * Resets timer on mouse move, keydown, click, scroll.
 */
export function useSessionTimeout(logout: () => void, enabled: boolean): void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastActivityRef = useRef(Date.now())

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (!enabled) return
    timeoutRef.current = setTimeout(() => {
      logout()
    }, SESSION_TIMEOUT_MS)
  }, [logout, enabled])

  useEffect(() => {
    if (!enabled) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      return
    }
    resetTimer()
    const events = ['mousedown', 'keydown', 'scroll', 'mousemove']
    events.forEach((e) => window.addEventListener(e, resetTimer))
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer))
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [enabled, resetTimer])
}
