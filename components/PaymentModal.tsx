"use client"

import { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { paymentService, PAYMENT_AMOUNT, RECIPIENT_ADDRESS } from '@/lib/usdcPayment'
import { 
  DollarSign, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Wallet, 
  Send,
  Clock
} from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPaymentSuccess: () => void
}

export function PaymentModal({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const { publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()
  const { toast } = useToast()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [signature, setSignature] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handlePayment = async () => {
    if (!publicKey || !signTransaction) {
      toast({
        title: "❌ Wallet Not Connected",
        description: "Please connect your wallet to make a payment.",
        id: `wallet-error-${Date.now()}`,
      })
      return
    }

    setIsProcessing(true)
    setPaymentStatus('processing')
    setError('')

    try {
      // Check sufficient funds
      const hasFunds = await paymentService.checkSufficientFunds(publicKey, PAYMENT_AMOUNT)
      if (!hasFunds) {
        throw new Error(`Insufficient USDC balance. You need at least ${PAYMENT_AMOUNT} USDC for chat access.`)
      }

      // Create payment transaction
      const result = await paymentService.createPaymentTransaction({
        userPublicKey: publicKey,
        amount: PAYMENT_AMOUNT,
        memo: 'X402 Chat Payment - Alphyre'
      })

      if (!result.success || !result.transaction) {
        throw new Error(result.error || 'Failed to create payment transaction')
      }

      // Sign transaction
      const signedTransaction = await signTransaction(result.transaction)

      // Send transaction
      const txSignature = await connection.sendRawTransaction(signedTransaction.serialize())
      
      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(txSignature, 'confirmed')
      
      if (confirmation.value.err) {
        throw new Error('Transaction failed')
      }

      setSignature(txSignature)
      setPaymentStatus('success')
      
      toast({
        title: "✅ Payment Successful!",
        description: `You've successfully paid ${PAYMENT_AMOUNT} USDC for chat access.`,
        id: `payment-success-${Date.now()}`,
      })

      // Call success callback after a short delay
      setTimeout(() => {
        onPaymentSuccess()
        onClose()
      }, 2000)

    } catch (error) {
      console.error('Payment error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Payment failed'
      setError(errorMessage)
      setPaymentStatus('error')
      
      toast({
        title: "❌ Payment Failed",
        description: errorMessage,
        id: `payment-error-${Date.now()}`,
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-card border border-accent/30 shadow-[0_0_50px_-12px_rgba(216,105,142,0.3)]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4 border border-accent/30">
            <DollarSign className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Chat Access Payment</h2>
          <p className="text-sm text-muted-foreground">
            Pay {PAYMENT_AMOUNT} USDC to unlock unlimited chat access
          </p>
        </div>

        {/* Payment Details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg border border-accent/20">
            <span className="text-sm font-medium">Amount</span>
            <div className="flex items-center gap-2">
              <Badge className="bg-accent/20 text-accent border-accent/30 font-bold">
                {PAYMENT_AMOUNT} USDC
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">Recipient</span>
            <span className="text-sm font-mono">{formatAddress(RECIPIENT_ADDRESS.toString())}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="text-sm font-medium">Network</span>
            <Badge variant="outline" className="font-bold">Solana Mainnet</Badge>
          </div>
        </div>

        {/* Status Display */}
        {paymentStatus === 'processing' && (
          <div className="flex items-center justify-center p-4 mb-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />
            <span className="text-sm font-medium text-blue-500">Processing payment...</span>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-green-500">Payment successful!</span>
            </div>
            {signature && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Transaction:</p>
                <p className="text-xs font-mono break-all">{signature}</p>
              </div>
            )}
          </div>
        )}

        {paymentStatus === 'error' && error && (
          <div className="flex items-center p-4 mb-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
            <span className="text-sm text-red-500">{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1"
          >
            Cancel
          </Button>
          
          <Button
            onClick={handlePayment}
            disabled={isProcessing || paymentStatus === 'success'}
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Processing...
              </>
            ) : paymentStatus === 'success' ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Paid
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Pay {PAYMENT_AMOUNT} USDC
              </>
            )}
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">
                Payment grants unlimited chat access for this session. 
                Secure payments powered by Solana blockchain.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}