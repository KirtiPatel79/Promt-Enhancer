import { useCallback } from 'react'

export function useToast() {
  const toast = useCallback((opts: { title: string; description?: string; variant?: string }) => {
    alert(`${opts.title}\n${opts.description || ''}`)
  }, [])

  return { toast }
}