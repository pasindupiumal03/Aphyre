// Temporarily disabled ETH Tracker functionality
export default function ETHTracker() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-muted-foreground mb-4">ETH Tracker</h1>
        <p className="text-muted-foreground">This feature is temporarily disabled.</p>
      </div>
    </div>
  )
}

// "use client"

// import Link from "next/link"
// import { useState } from "react"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { TrendingUp, BarChart3, Coins, Globe, MessageSquare, Wallet, Zap, Search, Loader2, AlertCircle } from "lucide-react"
// import { useEthTracker } from "@/hooks/use-eth-tracker"
// import { useRouter } from "next/navigation"
// import { Sidebar } from "@/components/sidebar"

// export default function ETHTracker() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isSearching, setIsSearching] = useState(false)
//   const [isNavigating, setIsNavigating] = useState(false)
//   const [navigatingTokenAddress, setNavigatingTokenAddress] = useState<string | null>(null)
//   const { data, isLoading, error, searchToken } = useEthTracker()
//   const router = useRouter()

//   const handleTokenClick = async (tokenAddress: string) => {
//     if (!tokenAddress || isNavigating) return
    
//     try {
//       setIsNavigating(true)
//       setNavigatingTokenAddress(tokenAddress)
      
//       // Add a minimum loading time to prevent too many rapid requests
//       await new Promise(resolve => setTimeout(resolve, 800))
      
//       router.push(`/eth-tracker/${tokenAddress}`)
//     } catch (error) {
//       console.error("Navigation error:", error)
//     } finally {
//       // Keep loading state for a bit longer for smooth transition
//       setTimeout(() => {
//         setIsNavigating(false)
//         setNavigatingTokenAddress(null)
//       }, 200)
//     }
//   }

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) return
    
//     // Validate Ethereum address format
//     const trimmedQuery = searchQuery.trim()
//     if (!trimmedQuery.startsWith('0x') || trimmedQuery.length !== 42) {
//       alert('Please enter a valid Ethereum token address (0x... format, 42 characters)')
//       return
//     }
    
//     setIsSearching(true)
    
//     try {
//       // Navigate to token detail page
//       router.push(`/eth-tracker/${trimmedQuery}`)
//     } catch (error) {
//       console.error('Navigation error:', error)
//     } finally {
//       setIsSearching(false)
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearch()
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Sidebar />

//       {/* Main Content */}
//       <main className="ml-0 lg:ml-72 p-6 lg:p-12">
//         {/* Header */}
//         <div className="mb-12">
//           <h2 className="mb-4 text-7xl font-black tracking-tighter leading-none text-balance">
//             ETHEREUM <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">TRACKER</span>
//           </h2>
//           <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium">
//             Real-time Ethereum token analytics and market insights.
//             <br />
//             Track any ERC-20 token with comprehensive data.
//           </p>
//         </div>

//         {/* Token Search */}
//         <Card className="mb-12 p-8 border-accent/30 bg-linear-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
//           <h3 className="text-3xl font-black tracking-tighter mb-6">TOKEN SEARCH</h3>
//           <div className="flex gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <Input
//                 placeholder="Enter Ethereum token address (0x...)"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="h-14 pl-12 text-base font-medium bg-secondary/50 border-border"
//               />
//             </div>
//             <Button 
//               onClick={handleSearch}
//               disabled={isSearching || !searchQuery.trim()}
//               className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent disabled:opacity-50"
//             >
//               {isSearching ? (
//                 <Loader2 className="h-5 w-5 animate-spin" />
//               ) : (
//                 "Search"
//               )}
//             </Button>
//           </div>
//         </Card>

//         {/* Trending Tokens */}
//         <div>
//           <h3 className="text-4xl font-black tracking-tighter mb-8">
//             TRENDING ETH TOKENS <span className="text-cyan drop-shadow-[0_0_30px_rgba(192,252,248,0.5)]">(24H)</span>
//           </h3>

//           {error ? (
//             <Card className="p-8 border-destructive/30 bg-destructive/5">
//               <div className="flex items-center gap-3">
//                 <AlertCircle className="h-6 w-6 text-destructive" />
//                 <p className="text-destructive font-medium">Failed to load trending tokens: {error}</p>
//               </div>
//             </Card>
//           ) : isLoading ? (
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//               {[...Array(20)].map((_, index) => (
//                 <Card key={index} className="p-6 bg-card">
//                   <div className="flex flex-col items-center text-center animate-pulse">
//                     <div className="mb-4 h-20 w-20 rounded-full bg-secondary/50"></div>
//                     <div className="h-4 w-32 bg-secondary/50 rounded mb-2"></div>
//                     <div className="h-3 w-16 bg-secondary/50 rounded mb-4"></div>
//                     <div className="h-6 w-24 bg-secondary/50 rounded mb-2"></div>
//                     <div className="h-3 w-12 bg-secondary/50 rounded mb-3"></div>
//                     <div className="h-3 w-20 bg-secondary/50 rounded"></div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           ) : data?.trendingTokens && data.trendingTokens.length > 0 ? (
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//               {data.trendingTokens.slice(0, 20).map((token, index) => {
//                 const isTokenNavigating = navigatingTokenAddress === token.token_address
                
//                 return (
//                   <Card 
//                     key={token.token_address || index} 
//                     className={`p-6 bg-card border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] transition-all duration-300 cursor-pointer group ${
//                       isTokenNavigating ? 'opacity-75 pointer-events-none' : ''
//                     }`}
//                     onClick={() => handleTokenClick(token.token_address)}
//                   >
//                     <div className="flex flex-col items-center text-center">
//                       <div className="mb-4 h-20 w-20 rounded-full bg-linear-to-br from-accent/20 to-cyan/20 flex items-center justify-center text-4xl border-2 border-accent/30 group-hover:border-accent/50 transition-colors relative">
//                         {isTokenNavigating ? (
//                           <Loader2 className="h-8 w-8 text-accent animate-spin" />
//                         ) : token.logo ? (
//                           <img 
//                             src={token.logo} 
//                             alt={token.name} 
//                             className="w-12 h-12 rounded-full"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).style.display = 'none'
//                               const parent = (e.target as HTMLImageElement).parentElement
//                               if (parent) {
//                                 parent.innerHTML = token.symbol?.charAt(0) || '?'
//                               }
//                             }}
//                           />
//                         ) : (
//                           <span className="text-xl font-bold text-accent group-hover:text-cyan transition-colors">
//                             {token.symbol?.charAt(0) || '?'}
//                           </span>
//                         )}
//                       </div>
//                       <h4 className="text-lg font-black mb-1 line-clamp-2 h-14 flex items-center group-hover:text-accent transition-colors">
//                         {isTokenNavigating ? 'Loading...' : (token.name || 'Unknown Token')}
//                       </h4>
//                       <Badge variant="secondary" className="mb-4 font-bold group-hover:bg-accent/20 transition-colors">
//                         {token.symbol || 'N/A'}
//                       </Badge>
//                       <p className="text-2xl font-black text-accent mb-2 group-hover:text-cyan transition-colors">
//                         ${token.usdPrice ? `${Number(token.usdPrice).toFixed(6)}` : 'N/A'}
//                       </p>
//                       <p className={`text-sm font-bold mb-3 ${
//                         token.pricePercentChange['24h'] && token.pricePercentChange['24h'] > 0 
//                           ? 'text-green-500' 
//                           : 'text-destructive'
//                       }`}>
//                         {token.pricePercentChange['24h'] 
//                           ? `${token.pricePercentChange['24h'] > 0 ? '+' : ''}${token.pricePercentChange['24h'].toFixed(2)}%`
//                           : 'N/A'
//                         }
//                       </p>
//                       <p className="text-xs text-muted-foreground font-medium group-hover:text-accent/70 transition-colors">
//                         {isTokenNavigating ? 'Opening details...' : `Volume: ${token.totalVolume['24h'] ? `${token.totalVolume['24h'].toLocaleString()}` : 'N/A'}`}
//                       </p>
//                     </div>
//                   </Card>
//                 )
//               })}
//             </div>
//           ) : (
//             <Card className="p-8 border-muted">
//               <div className="text-center">
//                 <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <p className="text-muted-foreground font-medium">No trending tokens available at the moment.</p>
//               </div>
//             </Card>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }
