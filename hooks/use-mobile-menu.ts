import { useState, useEffect } from 'react'

export function useMobileMenu() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileOpen])

  const toggleMobileMenu = () => setIsMobileOpen(prev => !prev)
  const closeMobileMenu = () => setIsMobileOpen(false)
  const openMobileMenu = () => setIsMobileOpen(true)

  return {
    isMobileOpen,
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
  }
}