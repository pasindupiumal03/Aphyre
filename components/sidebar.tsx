"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  MessageSquare,
  TrendingUp,
  Coins,
  Globe,
  Wallet,
  Sparkles,
  Crown,
  Users,
  Zap,
  Menu,
  X,
} from "lucide-react"

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname?.startsWith(path)) return true
    return false
  }

  const getButtonClasses = (path: string) => {
    return isActive(path)
      ? "w-full justify-start gap-3 h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent"
      : "w-full justify-start gap-3 h-12 text-base font-semibold hover:bg-secondary/30 text-foreground"
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card/80 backdrop-blur-sm border border-border"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" 
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-72 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col z-40
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${className || ""}
      `}>
        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-8 pb-0 scrollbar-hide">
          <div className="mb-12">
            <h1 className="text-3xl font-black tracking-tighter">Aphyre</h1>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mt-1">
              TRADING INTELLIGENCE
            </p>
          </div>

          <div className="mb-10 rounded-2xl bg-secondary/30 p-5 border border-accent/20">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-glow-accent">
                <Coins className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold">Free Plan</p>
                <p className="text-xs text-muted-foreground font-medium">Early Access Member</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2 mb-8">
            <Link href="/" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={getButtonClasses("/")}
              >
                <BarChart3 className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/ai-chat" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={getButtonClasses("/ai-chat")}
              >
                <MessageSquare className="h-5 w-5" />
                AI Chat
              </Button>
            </Link>
            <Link href="/news-sentiment" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={getButtonClasses("/news-sentiment")}
              >
                <TrendingUp className="h-5 w-5" />
                News Sentiment
              </Button>
            </Link>
            <Link href="/eth-tracker" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={getButtonClasses("/eth-tracker")}
              >
                <Coins className="h-5 w-5" />
                ETH Tracker
              </Button>
            </Link>
            <Link href="/solana-tracker" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={getButtonClasses("/solana-tracker")}
              >
                <Globe className="h-5 w-5" />
                Solana Tracker
              </Button>
            </Link>
            <Link href="/wallet-lookup" onClick={closeMobileMenu}>
              <Button
                variant="ghost"
                className={getButtonClasses("/wallet-lookup")}
              >
                <Wallet className="h-5 w-5" />
                Wallet Lookup
              </Button>
            </Link>
            <div className="pt-4 mt-4 border-t border-border">
              <Link href="/phase-2" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className={getButtonClasses("/phase-2")}
                >
                  <Sparkles className="h-5 w-5" />
                  Phase 2
                </Button>
              </Link>
              <Link href="/pricing" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className={getButtonClasses("/pricing")}
                >
                  <Crown className="h-5 w-5" />
                  Pricing
                </Button>
              </Link>
              <Link href="/about" onClick={closeMobileMenu}>
                <Button
                  variant="ghost"
                  className={getButtonClasses("/about")}
                >
                  <Users className="h-5 w-5" />
                  About Us
                </Button>
              </Link>
            </div>
          </nav>
        </div>

        {/* Fixed Bottom Button */}
        <div className="p-8 pt-0 shrink-0">
          <Button className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent">
            <Zap className="h-5 w-5 mr-2" />
            Connect Phantom
          </Button>
        </div>
      </aside>
    </>
  )
}
