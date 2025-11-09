"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import {
  TrendingUp,
  BarChart3,
  Coins,
  Globe,
  MessageSquare,
  Wallet,
  Zap,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Loader2,
} from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: string
}

const suggestedQuestions = [
  "What is the current price of Bitcoin?",
  "Show me the top gainers in the last 24 hours",
  "What are the latest market trends?",
  "What are the top cryptocurrencies by market cap?",
]

export default function AIChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on mount and after sending messages
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading])

  // Send message to AI API
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      })
    }

    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText.trim(),
          conversationHistory: messages
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || "I apologize, but I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false
        })
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm experiencing technical difficulties. Please try again in a moment.",
        isUser: false,
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(message)
  }

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question)
  }

  // Handle copy message
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  // Format message content to render markdown-like formatting
  const formatMessageContent = (content: string) => {
    return content
      // Convert section headers (text followed by colon) to bold
      .replace(/^([^:\n]+):/gm, '<strong class="text-accent">$1:</strong>')
      // Convert **text** to bold (only remaining instances)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert *text* to italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Convert `code` to inline code
      .replace(/`(.*?)`/g, '<code class="bg-secondary/50 px-1 py-0.5 rounded text-accent font-mono text-xs">$1</code>')
      // Convert newlines to <br> tags
      .replace(/\n/g, '<br>')
      // Convert bullet points • to styled bullets
      .replace(/^• /gm, '<span class="text-accent font-bold">• </span>')
      // Convert numbered lists
      .replace(/^(\d+)\. /gm, '<span class="text-accent font-bold">$1. </span>')
      // Style percentage values
      .replace(/([+-]?\d+\.?\d*%)/g, '<span class="font-bold text-blue-400">$1</span>')
      // Style dollar amounts
      .replace(/\$([0-9,]+\.?\d*)/g, '<span class="font-bold text-green-400">$$$1</span>')
      // Style crypto symbols in parentheses
      .replace(/\(([A-Z]{2,5})\)/g, '<span class="text-accent font-semibold">($1)</span>')
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-0 lg:ml-72 p-6 lg:p-12 flex flex-col h-screen">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="mb-2 text-4xl sm:text-6xl font-black tracking-tighter leading-none">
              AI <span className="text-accent drop-shadow-[0_0_30px_rgba(216,105,142,0.5)]">TRADING</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-medium">
              Advanced AI assistant for crypto analysis and trading insights.
            </p>
          </div>
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30 font-bold px-4 py-2 self-start">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            AI Online
          </Badge>
        </div>

        {/* Chat Area */}
        <div className="flex-1 mb-8 overflow-y-auto scrollbar-hide">
          {messages.length === 0 ? (
            <>
              {/* AI Welcome Message */}
              <Card className="mb-6 p-6 border-accent/30 bg-linear-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)]">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-glow-accent shrink-0">
                    <Sparkles className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="text-sm font-black uppercase tracking-widest text-accent">APHYRE AI</h4>
                      <span className="text-xs text-muted-foreground font-medium">
                        {new Date().toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: false
                        })}
                      </span>
                    </div>
                    <div className="space-y-3 text-sm leading-relaxed">
                      <p className="font-medium">
                        Welcome to Aphyre AI! 🚀
                        <br />
                        I'm your advanced crypto trading assistant. I can analyze tokens on both Solana and Ethereum
                        networks. Here's what I can do:
                      </p>
                      <ul className="space-y-2 font-medium">
                        <li>
                          <strong className="text-foreground">• Token Analysis:</strong> Send me any token address, name, or
                          symbol
                        </li>
                        <li>
                          <strong className="text-foreground">• Market Insights:</strong> Get real-time price data and
                          market trends
                        </li>
                        <li>
                          <strong className="text-foreground">• Risk Assessment:</strong> Understand potential risks and
                          opportunities
                        </li>
                        <li>
                          <strong className="text-foreground">• Trading Advice:</strong> Get personalized trading strategies
                        </li>
                      </ul>
                      <p className="font-medium">
                        Try sending me a token address like <code className="text-accent font-bold">PUMP</code> or{" "}
                        <code className="text-accent font-bold">0x...</code> to get started!
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary/50">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary/50">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary/50">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Suggested Questions */}
              <div className="mb-6">
                <h3 className="text-2xl font-black tracking-tighter mb-4">Suggested Questions</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {suggestedQuestions.map((question, index) => (
                    <Card
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="group cursor-pointer transition-all border-border hover:border-accent/50 hover:shadow-[0_8px_30px_-12px_rgba(216,105,142,0.3)] p-4 bg-card"
                    >
                      <p className="text-sm font-bold group-hover:text-accent transition-colors flex items-start gap-2">
                        <span className="text-accent">•</span>
                        {question}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <Card 
                  key={msg.id}
                  className={`p-6 ${
                    msg.isUser 
                      ? 'border-blue-500/30 bg-linear-to-br from-blue-500/5 to-card ml-12' 
                      : 'border-accent/30 bg-linear-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)] mr-12'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
                      msg.isUser 
                        ? 'bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                        : 'bg-accent shadow-glow-accent'
                    }`}>
                      {msg.isUser ? (
                        <MessageSquare className="h-6 w-6 text-white" />
                      ) : (
                        <Sparkles className="h-6 w-6 text-accent-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className={`text-sm font-black uppercase tracking-widest ${
                          msg.isUser ? 'text-blue-500' : 'text-accent'
                        }`}>
                          {msg.isUser ? 'YOU' : 'APHYRE AI'}
                        </h4>
                        <span className="text-xs text-muted-foreground font-medium">{msg.timestamp}</span>
                      </div>
                      <div className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: formatMessageContent(msg.content) 
                          }} 
                        />
                      </div>
                      {!msg.isUser && (
                        <div className="flex items-center gap-2 mt-4">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-secondary/50"
                            onClick={() => copyMessage(msg.content)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary/50">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-secondary/50">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <Card className="p-6 border-accent/30 bg-linear-to-br from-card to-accent/5 shadow-[0_0_40px_-12px_rgba(216,105,142,0.3)] mr-12">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-glow-accent shrink-0">
                      <Loader2 className="h-6 w-6 text-accent-foreground animate-spin" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="text-sm font-black uppercase tracking-widest text-accent">APHYRE AI</h4>
                        <span className="text-xs text-muted-foreground font-medium">Typing...</span>
                      </div>
                      <div className="text-sm leading-relaxed font-medium">
                        Analyzing your request...
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border pt-6">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Input
              ref={inputRef}
              placeholder="Ask about crypto analysis, market trends, or token insights..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              className="h-14 text-base font-medium bg-secondary/50 border-border"
            />
            <Button 
              type="submit"
              disabled={!message.trim() || isLoading}
              className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base shadow-glow-accent disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3 font-medium flex items-center gap-2">
            <Badge variant="secondary" className="font-bold text-xs">
              {isLoading ? 'Processing...' : 'Connected'}
            </Badge>
            Aphyre AI may produce inaccurate information. Always verify important information. v2.1.0
          </p>
        </div>
      </main>
    </div>
  )
}
