"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { paymentService } from "@/lib/usdcPayment"
import {
  Shield,
  Zap,
  Globe,
  Coins,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Wallet,
  Users,
  Crown,
  Sparkles,
  Send,
  Activity,
  ArrowRight,
  Code2,
  Layers,
  Bot,
  DollarSign,
  Loader2,
  Copy,
  CheckCircle,
  AlertCircle,
  CreditCard,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  paymentSignature?: string
}

// Helper function to format message content
const formatMessageContent = (content: string) => {
  // Clean up any remaining markdown symbols and format text properly
  return content
    // Remove excessive ** symbols
    .replace(/\*\*\*/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    // Clean up excessive spacing
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

export default function X402Page() {
  const { connected, publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const router = useRouter()
  const { toast } = useToast()

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I'm X402 Agent, your premium AI cryptocurrency specialist powered by the X402 payment protocol.

🔍 I can help you with:
• Cryptocurrency trading strategies and market analysis
• Technical analysis and chart reading  
• DeFi protocols (Uniswap, Aave, Compound, etc.)
• Blockchain development (Solana, Ethereum)
• Smart contract development (Solidity, Anchor/Rust)
• NFT markets and minting strategies
• Yield farming and liquidity mining
• Cross-chain technologies and bridges
• Crypto portfolio management and risk assessment
• Web3 development and integration

💰 Payment System: Each message costs 0.00001 USDC, paid instantly via Solana for premium crypto expertise.

Ask me any cryptocurrency, blockchain, or Web3 question to get started! 🚀`,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      })
    },
  ])
  
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [userBalance, setUserBalance] = useState<number>(0)
  const [sufficientFunds, setSufficientFunds] = useState<boolean>(false)

  // Stats state  
  const [activities, setActivities] = useState([
    { agent: "CryptoAnalyzer_AI", amount: 0.00001, service: "trading strategy", time: "just now", isNew: true },
    { agent: "DeFi_Agent_42", amount: 0.00001, service: "yield farming", time: "2s ago", isNew: false },
    { agent: "BlockchainBot_v3", amount: 0.00001, service: "smart contract audit", time: "5s ago", isNew: false },
    { agent: "Web3Architect", amount: 0.00001, service: "DeFi protocol design", time: "8s ago", isNew: false },
  ])

  const [stats, setStats] = useState({
    apiCalls: 1248267,
    cryptoAnalysis: 4882,
    activeAgents: 141,
    earnedUSDC: 4.19,
  })

  // Check wallet connection on page load
  useEffect(() => {
    if (!connected) {
      router.push('/')
    }
  }, [connected, router])

  // Check user balance when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      checkUserBalance()
    }
  }, [connected, publicKey])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats
      setStats((prev) => ({
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 10),
        cryptoAnalysis: prev.cryptoAnalysis + (Math.random() > 0.7 ? 1 : 0),
        activeAgents: prev.activeAgents + (Math.random() > 0.5 ? 1 : -1),
        earnedUSDC: prev.earnedUSDC + Math.random() * 0.00001,
      }))

      // Add new activity
      const agents = ["CryptoTrader_AI", "DeFiExpert_Bot", "YieldMaster", "NFTAnalyzer", "ChainOptimizer"]
      const services = [
        "trading analysis",
        "DeFi strategy", 
        "yield optimization",
        "NFT valuation",
        "portfolio rebalancing",
        "risk assessment",
      ]
      const newActivity = {
        agent: agents[Math.floor(Math.random() * agents.length)],
        amount: 0.00001,
        service: services[Math.floor(Math.random() * services.length)],
        time: "just now",
        isNew: true,
      }

      setActivities((prev) => {
        const updated = prev.map((a) => ({ ...a, isNew: false }))
        return [newActivity, ...updated.slice(0, 7)]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Check user USDC balance
  const checkUserBalance = async () => {
    if (!publicKey) {
      setUserBalance(0)
      setSufficientFunds(false)
      return
    }

    try {
      console.log('Checking balance for wallet:', publicKey.toBase58())
      
      // Direct balance check using payment service
      const balance = await paymentService.getUserUSDCBalance(publicKey)
      const hasSufficientFunds = await paymentService.checkSufficientFunds(publicKey)
      
      console.log('USDC Balance:', balance, 'Sufficient funds:', hasSufficientFunds)
      
      setUserBalance(balance)
      setSufficientFunds(hasSufficientFunds)
      
      if (balance === 0) {
        // Debug: Check what tokens the user has
        const allAccounts = await (paymentService as any).getAllUserTokenAccounts(publicKey)
        console.log('User token accounts:', allAccounts)
        
        toast({
          title: "💰 USDC Balance Check",
          description: "No USDC balance found. Please ensure you have USDC tokens in your Phantom wallet. You may need to receive USDC first to create your token account.",
          id: `balance-check-${Date.now()}`,
        })
      } else if (balance > 0 && balance < 0.00001) {
        toast({
          title: "⚠️ Insufficient USDC",
          description: `You have ${balance.toFixed(6)} USDC but need at least 0.00001 USDC per message.`,
          id: `insufficient-${Date.now()}`,
        })
      } else {
        toast({
          title: "✅ USDC Balance Loaded",
          description: `You have ${balance.toFixed(6)} USDC available for chat. Each message costs 0.00001 USDC.`,
          id: `balance-success-${Date.now()}`,
        })
      }
    } catch (error) {
      console.error('Error checking balance:', error)
      setUserBalance(0)
      setSufficientFunds(false)
      toast({
        title: "⚠️ Balance Check Failed",
        description: "Unable to check USDC balance. Please ensure your wallet is connected and try again.",
        id: `balance-error-${Date.now()}`,
      })
    }
  }

  // Create and send payment transaction
  const processPayment = async (): Promise<string | null> => {
    if (!publicKey || !sendTransaction) {
      toast({
        title: "❌ Wallet Error", 
        description: "Please ensure your wallet is connected properly.",
        id: `wallet-error-${Date.now()}`,
      })
      return null
    }

    try {
      setIsPaymentProcessing(true)

      console.log('Starting payment process...')
      console.log('Wallet connected:', !!publicKey)
      console.log('Send transaction available:', !!sendTransaction)
      console.log('Connection available:', !!connection)

      // Create payment transaction
      const paymentResult = await paymentService.createPaymentTransaction({
        userPublicKey: publicKey,
        amount: 0.00001,
        memo: 'X402 Chat Payment'
      })

      if (!paymentResult.success || !paymentResult.transaction) {
        throw new Error(paymentResult.error || 'Failed to create payment transaction')
      }

      console.log('Payment transaction created, requesting signature from wallet...')

      // Send transaction - this should open Phantom wallet
      const signature = await sendTransaction(paymentResult.transaction, connection)
      
      console.log('Payment transaction sent with signature:', signature)
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed')

      console.log('Payment transaction confirmed:', signature)

      toast({
        title: "✅ Payment Successful!",
        description: `Payment of 0.00001 USDC confirmed. Transaction: ${signature.slice(0, 8)}...`,
        id: `payment-success-${Date.now()}`,
      })

      // Update balance
      await checkUserBalance()

      return signature
    } catch (error: any) {
      console.error('Payment error:', error)
      
      let errorMessage = 'Payment failed. Please try again.'
      if (error.message?.includes('User rejected')) {
        errorMessage = 'Payment was cancelled by user.'
      } else if (error.message?.includes('Insufficient')) {
        errorMessage = 'Insufficient USDC balance. Please add funds to your wallet.'
      }

      toast({
        title: "❌ Payment Failed",
        description: errorMessage,
        id: `payment-error-${Date.now()}`,
      })

      return null
    } finally {
      setIsPaymentProcessing(false)
    }
  }

  // Send message with payment
  const handleSend = async () => {
    if (!input.trim() || isLoading || isPaymentProcessing || !publicKey) return

    const messageText = input.trim()
    setInput("")
    setIsLoading(true)

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user", 
      content: messageText,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      })
    }

    setMessages(prev => [...prev, userMessage])

    try {
      // Process payment first
      const paymentSignature = await processPayment()
      
      if (!paymentSignature) {
        // Remove user message if payment failed
        setMessages(prev => prev.filter(m => m.id !== userMessage.id))
        return
      }

      // Send message to AI with payment proof
      const response = await fetch('/api/x402-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages,
          walletAddress: publicKey.toBase58(),
          paymentSignature
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(errorData.error || errorData.message || 'Failed to get AI response')
      }

      const data = await response.json()
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "I apologize, but I couldn't process your request. Please try again.",
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        }),
        paymentSignature
      }

      setMessages(prev => [...prev, aiMessage])
      
      // Update user message with payment signature
      setMessages(prev => prev.map(m => 
        m.id === userMessage.id ? { ...m, paymentSignature } : m
      ))

    } catch (error: any) {
      console.error('Error sending message:', error)
      
      // Remove user message and show error
      setMessages(prev => prev.filter(m => m.id !== userMessage.id))
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm experiencing technical difficulties. Your payment will be refunded if the issue persists.",
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        })
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Show wallet connection prompt if not connected
  if (!connected) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 ml-0 lg:ml-72 p-6 lg:p-12">
          <div className="flex items-center justify-center h-full">
            <Card className="p-12 text-center border border-accent/30 bg-gradient-to-br from-card to-accent/5 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)]">
              <div className="h-20 w-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6 border border-accent/30">
                <Wallet className="h-10 w-10 text-accent" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Wallet Required</h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                You need to connect your Phantom wallet to access X402 features. Please connect your wallet to continue.
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent"
              >
                <Zap className="h-5 w-5 mr-2" />
                Connect Wallet
              </Button>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-72">
        <div className="grid grid-cols-2 h-screen">
          {/* Left Side - x402 Info */}
          <div className="p-12 overflow-y-scroll scrollbar-hide bg-gradient-to-br from-background via-background to-cyan/5">
            {/* Header */}
            <div className="mb-12">
              <Badge className="mb-6 bg-cyan/20 text-cyan border-cyan/30 px-6 py-2 text-sm font-bold">
                X402 PROTOCOL
              </Badge>
              <h1 className="text-7xl font-black tracking-tighter mb-6 leading-none text-balance">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue-400 to-cyan">
                  x402
                </span>
                <br />
                Payment Layer
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty font-medium max-w-2xl">
                The intelligent API that transforms cryptocurrency challenges into profitable solutions with premium AI assistance. Pay per use
                with HTTP 402 protocol on Solana.
              </p>
            </div>

            {/* Balance Display */}
            <Card className="mb-8 p-6 bg-gradient-to-br from-card to-accent/5 border-accent/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">Your USDC Balance</h3>
                  <p className="text-3xl font-black text-accent">${userBalance.toFixed(6)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Per Message Cost</p>
                  <p className="text-lg font-bold">$0.00001 USDC</p>
                  <Badge className={`mt-2 ${sufficientFunds ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'}`}>
                    {sufficientFunds ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {sufficientFunds ? 'Sufficient Funds' : 'Insufficient Funds'}
                  </Badge>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <Card className="p-6 bg-gradient-to-br from-cyan/10 to-cyan/5 border-cyan/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-cyan" />
                    <p className="text-sm font-bold text-cyan">24H</p>
                  </div>
                </div>
                <p className="text-4xl font-black mb-1">{stats.apiCalls.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground font-medium">API calls today</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-green-500" />
                    <p className="text-sm font-bold text-green-500">LIVE</p>
                  </div>
                </div>
                <p className="text-4xl font-black mb-1">{stats.cryptoAnalysis.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground font-medium">Crypto analyses completed</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-accent" />
                    <p className="text-sm font-bold text-accent">ACTIVE</p>
                  </div>
                </div>
                <p className="text-4xl font-black mb-1">{stats.activeAgents}</p>
                <p className="text-sm text-muted-foreground font-medium">AI agents connected</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-cyan/10 to-cyan/5 border-cyan/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-cyan" />
                    <p className="text-sm font-bold text-cyan">USDC</p>
                  </div>
                </div>
                <p className="text-4xl font-black mb-1">${stats.earnedUSDC.toFixed(5)}</p>
                <p className="text-sm text-muted-foreground font-medium">Earned via x402 (24h)</p>
              </Card>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-6 w-6 text-cyan" />
                <h3 className="text-3xl font-black">Real-Time Activity Feed</h3>
              </div>
              <Card className="p-6 bg-gradient-to-br from-card to-cyan/5 border-cyan/30">
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                        activity.isNew ? "bg-cyan/10 border-cyan/30 animate-pulse" : "bg-card/50 border-border/50"
                      }`}
                    >
                      <div className="h-10 w-10 rounded-lg bg-cyan/20 flex items-center justify-center border border-cyan/30 flex-shrink-0">
                        <Bot className="h-5 w-5 text-cyan" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">
                          {activity.agent} <span className="text-muted-foreground font-normal">paid</span>{" "}
                          <span className="text-cyan">${activity.amount.toFixed(5)}</span>{" "}
                          <span className="text-muted-foreground font-normal">for</span> {activity.service}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      {activity.isNew && (
                        <Badge className="bg-cyan/20 text-cyan border-cyan/30 text-xs font-bold">NEW</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Features */}
            <div className="space-y-6 mb-12">
              <h3 className="text-3xl font-black mb-6">Core Capabilities</h3>

              <Card className="p-6 bg-gradient-to-br from-cyan/10 to-cyan/5 border-cyan/30">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan/20 flex items-center justify-center border border-cyan/30 flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-cyan" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Solana USDC Payments</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Pay 0.00001 USDC per message using HTTP 402 protocol. Instant payment verification on Solana 
                      mainnet with sub-second confirmation times.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-bold">
                        Solana
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        USDC
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Instant
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30 flex-shrink-0">
                    <Code2 className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">AI-Powered Crypto Analysis</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Advanced cryptocurrency specialist powered by GPT-3.5 Turbo. Get expert help with trading strategies, 
                      DeFi protocols, market analysis, and blockchain development across multiple chains.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-bold">
                        Trading
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        DeFi
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Real-time
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-border">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center border border-border flex-shrink-0">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Secure & Private</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      All payments are verified on-chain. Your conversations are private and secure. No subscription 
                      fees - pay only for what you use with transparent micro-transactions.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-bold">
                        On-Chain
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Private
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Pay-per-use
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-cyan/10 to-cyan/5 border-cyan/30">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-cyan/20 flex items-center justify-center border border-cyan/30 flex-shrink-0">
                    <Layers className="h-6 w-6 text-cyan" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black mb-2">Blockchain Development</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Specialized assistance for blockchain development including Solana programs, Ethereum smart contracts, 
                      DeFi protocols, and Web3 integration patterns.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline" className="text-xs font-bold">
                        Solana
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        Ethereum
                      </Badge>
                      <Badge variant="outline" className="text-xs font-bold">
                        DeFi
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* How it Works */}
            <div className="mb-12">
              <h3 className="text-3xl font-black mb-6">How It Works</h3>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Send your crypto question",
                    desc: "Ask about trading strategies, DeFi protocols, or blockchain development",
                  },
                  {
                    step: "2", 
                    title: "Automatic USDC payment",
                    desc: "0.00001 USDC is charged and verified on Solana blockchain",
                  },
                  {
                    step: "3",
                    title: "AI processes your request",
                    desc: "Advanced AI analyzes your crypto question and generates expert insights",
                  },
                  {
                    step: "4",
                    title: "Receive crypto expertise",
                    desc: "Get detailed trading advice, DeFi strategies, and blockchain solutions",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-cyan text-cyan-foreground flex items-center justify-center font-black text-lg flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-black mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    {index < 3 && <ArrowRight className="h-5 w-5 text-muted-foreground mt-2" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient Address */}
            <div>
              <h3 className="text-3xl font-black mb-6">Payment Details</h3>
              <Card className="p-6 bg-card/50 backdrop-blur border-border">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-bold text-muted-foreground mb-2">Recipient Address:</p>
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                      <code className="text-sm font-mono flex-1">6yK1zeAnkqAe1fBP5Kk773EUm8taJvAsSxnMcYCSzhSL</code>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => navigator.clipboard.writeText('6yK1zeAnkqAe1fBP5Kk773EUm8taJvAsSxnMcYCSzhSL')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-bold text-muted-foreground mb-1">Network:</p>
                      <p className="text-sm">Solana Mainnet</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-muted-foreground mb-1">Token:</p>
                      <p className="text-sm">USDC</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Side - AI Chat */}
          <div className="flex flex-col h-screen border-l border-border bg-card/30 backdrop-blur">
            {/* Chat Header */}
            <div className="p-8 border-b border-border bg-gradient-to-r from-accent/10 to-cyan/10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center shadow-glow-accent">
                  <MessageSquare className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">X402 Agent</h2>
                  <p className="text-sm text-muted-foreground font-semibold tracking-wide">AI Crypto Specialist • $0.00001 USDC per message</p>
                </div>
                <div className="ml-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold text-green-500">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-scroll scrollbar-hide p-8 space-y-6">
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center flex-shrink-0 shadow-glow-accent">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <Card
                    className={`max-w-2xl p-4 ${
                      message.role === "user"
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-card border-border"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs font-bold tracking-wide ${message.role === "user" ? "text-black/80" : "text-muted-foreground"}`}>
                        {message.role === "user" ? "You" : "X402 Agent"} • {message.timestamp}
                      </span>
                      {message.paymentSignature && (
                        <Badge className="bg-emerald-900/40 text-emerald-100 border-emerald-700/50 text-xs font-bold">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                      )}
                    </div>
                    <div className={`text-base leading-relaxed whitespace-pre-wrap ${
                      message.role === "user" 
                        ? "font-semibold text-accent-foreground" 
                        : "font-normal text-foreground"
                    }`}>
                      {formatMessageContent(message.content)}
                    </div>
                    {message.paymentSignature && (
                      <div className="mt-3 pt-3 border-t border-border/30">
                        <p className={`text-xs font-mono font-bold tracking-wider ${
                          message.role === "user" ? "text-black/70" : "text-muted-foreground/80"
                        }`}>
                          Tx: {message.paymentSignature.slice(0, 8)}...{message.paymentSignature.slice(-8)}
                        </p>
                      </div>
                    )}
                  </Card>
                  {message.role === "user" && (
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {(isLoading || isPaymentProcessing) && (
                <div className="flex gap-4 justify-start">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center flex-shrink-0 shadow-glow-accent">
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  </div>
                  <Card className="max-w-2xl p-4 bg-card border-border">
                    <p className="text-base leading-relaxed font-medium text-muted-foreground">
                      {isPaymentProcessing ? "Processing payment..." : "Generating crypto analysis..."}
                    </p>
                  </Card>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-8 border-t border-border bg-card/50 backdrop-blur">
              <div className="flex gap-4">
                <Input
                  placeholder="Ask about crypto trading, DeFi strategies, blockchain development, or any cryptocurrency question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  disabled={isLoading || isPaymentProcessing || !sufficientFunds}
                  className="flex-1 h-14 px-6 text-base border-2 focus:border-accent font-medium"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading || isPaymentProcessing || !sufficientFunds}
                  size="lg"
                  className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-glow-accent disabled:opacity-50"
                >
                  {isLoading || isPaymentProcessing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-muted-foreground font-semibold">
                  {!sufficientFunds ? (
                    <span className="text-red-500 font-bold">⚠️ Insufficient USDC balance. Please add USDC to your Phantom wallet to continue. You need at least 0.00001 USDC per message.</span>
                  ) : (
                    <span>💳 Each message costs 0.00001 USDC • Balance: ${userBalance.toFixed(6)}</span>
                  )}
                </p>
                <Badge variant="secondary" className="font-bold text-xs tracking-wide">
                  {isPaymentProcessing ? 'Processing Payment...' : isLoading ? 'AI Thinking...' : 'Ready'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}