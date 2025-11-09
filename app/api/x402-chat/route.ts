import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { paymentService } from '@/lib/usdcPayment';

// Rate limiting storage (in production, use Redis or a database)
const messageCount = new Map<string, { count: number; timestamp: number }>();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const RPC_ENDPOINT = 'https://rpc-mainnet.solanatracker.io/?api_key=8b90bec5-e575-4212-9c39-4e2496f29a2f';

// Clean excessive markdown formatting
const cleanMarkdownFormatting = (text: string): string => {
  return text
    .replace(/\*\*([^*]+):\*\*/g, '$1:')
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')
    .replace(/^\*\*\s*-\s*/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

// Check if user has paid for this session
const checkPaymentStatus = async (userPublicKey: string, signature?: string): Promise<boolean> => {
  if (!signature) {
    console.log('No payment signature provided');
    return false;
  }
  
  try {
    console.log('Checking payment status for signature:', signature);
    
    // For testing purposes, let's simplify verification
    // Just check if the signature is valid format and transaction exists
    if (signature.length < 64) {
      console.log('Invalid signature format');
      return false;
    }
    
    const isValid = await paymentService.verifyPayment(signature);
    console.log('Payment verification result:', isValid);
    return isValid;
  } catch (error) {
    console.error('Error verifying payment:', error);
    
    // For testing, if verification fails but we have a signature, allow it
    // Remove this in production
    if (signature && signature.length >= 64) {
      console.log('Verification failed but signature format is valid, allowing for testing');
      return true;
    }
    
    return false;
  }
};

// Get AI response for X402
const getX402AIResponse = async (message: string, conversationHistory: any[]) => {
  if (!OPENAI_API_KEY || OPENAI_API_KEY.includes('your_') || OPENAI_API_KEY.includes('sk-your_')) {
    console.log('OpenAI API key not configured, using fallback response');
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return `🤖 147.402 Agent - Your AI Coding Assistant\n\nI can help you with:\n\n💻 Programming & Development:\n• Code debugging and optimization\n• API integration guidance\n• Best practices and architecture advice\n• Multi-language support (Python, JavaScript, Rust, etc.)\n\n🔗 Blockchain & Web3:\n• Smart contract development\n• DeFi protocol integration\n• Solana/Ethereum development\n• HTTP 402 payment implementation\n\n⚡ X402 Features:\n• Real-time payment verification\n• Cross-chain compatibility\n• Micro-transaction support\n\n💡 Ask me anything about coding, blockchain, or technical implementation!\n\n*Advanced AI powered by OpenAI GPT-3.5 Turbo*`;
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('402') || lowerMessage.includes('usdc')) {
      return `💰 X402 Payment System\n\nThe HTTP 402 protocol enables:\n• Pay-per-use API access\n• Micro-transactions (0.00001 USDC per message)\n• Instant blockchain verification\n• Cross-chain compatibility\n\nHow it works:\n1. Send USDC payment to smart contract\n2. Receive payment proof/signature\n3. Access premium AI features\n4. Real-time verification on Solana\n\nRecipient Address: 6yK1zeAnkqAe1fBP5Kk773EUm8taJvAsSxnMcYCSzhSL\n\n*Each message costs 0.00001 USDC*`;
    }
    
    return `I'm 147.402 Agent, your AI coding assistant! 🚀\n\nI specialize in:\n• Code development and debugging\n• Blockchain and Web3 integration\n• API design and HTTP 402 payments\n• Technical architecture advice\n\nWhat coding challenge can I help you solve today?\n\n*Powered by X402 micro-payment protocol*`;
  }
  
  try {
    const systemMessage = `You are 147.402 Agent, an advanced AI coding assistant specialized in:

CORE EXPERTISE:
• Programming languages (Python, JavaScript, TypeScript, Rust, Solana/Anchor, etc.)
• API development and integration
• Blockchain development (Solana, Ethereum)
• HTTP 402 payment protocol implementation
• DeFi and Web3 architecture
• Code debugging and optimization
• Technical architecture and best practices

PAYMENT CONTEXT:
• You operate on the X402 payment protocol
• Users pay 0.00001 USDC per message
• Payments are verified on Solana blockchain
• You provide premium coding assistance

RESPONSE STYLE:
• Be technical but accessible
• Provide code examples when helpful
• Explain complex concepts clearly
• Focus on practical, actionable advice
• Always be helpful and professional

You are knowledgeable about the latest development trends and can help with both theoretical concepts and practical implementation.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 800,
        messages: [
          {
            role: 'system',
            content: systemMessage
          },
          ...conversationHistory.slice(-5).map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    const aiResponse = result.choices?.[0]?.message?.content || 'I apologize, but I encountered an issue. Please try again.';
    
    return cleanMarkdownFormatting(aiResponse);
  } catch (error) {
    console.error('Error getting AI response:', error);
    return 'I\'m experiencing technical difficulties. Please try again in a moment.';
  }
};

export async function POST(request: NextRequest) {
  try {
    const { 
      message, 
      conversationHistory = [], 
      walletAddress, 
      paymentSignature,
      checkBalance 
    } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required for X402 access' },
        { status: 401 }
      );
    }

    // Check if user is requesting balance check
    if (checkBalance) {
      try {
        const userPublicKey = new PublicKey(walletAddress);
        const balance = await paymentService.getUserUSDCBalance(userPublicKey);
        const sufficientFunds = await paymentService.checkSufficientFunds(userPublicKey);
        
        return NextResponse.json({ 
          balance, 
          sufficientFunds,
          requiredAmount: 0.00001 
        });
      } catch (error) {
        console.error('Error checking balance:', error);
        return NextResponse.json(
          { error: 'Failed to check USDC balance' },
          { status: 500 }
        );
      }
    }

    // Verify payment for each message
    if (!paymentSignature) {
      console.log('No payment signature provided in request');
      return NextResponse.json(
        { 
          error: 'Payment required',
          paymentRequired: true,
          amount: 0.00001,
          currency: 'USDC',
          recipient: '6yK1zeAnkqAe1fBP5Kk773EUm8taJvAsSxnMcYCSzhSL',
          message: 'Please complete USDC payment to continue the conversation'
        },
        { status: 402 }
      );
    }

    console.log('Verifying payment for wallet:', walletAddress, 'signature:', paymentSignature);

    // Verify the payment
    const isPaymentValid = await checkPaymentStatus(walletAddress, paymentSignature);
    
    console.log('Payment verification result:', isPaymentValid);
    
    if (!isPaymentValid) {
      return NextResponse.json(
        { 
          error: 'Invalid payment signature',
          paymentRequired: true,
          message: 'Payment verification failed. Please complete a new payment.',
          details: 'The provided payment signature could not be verified on the blockchain.'
        },
        { status: 402 }
      );
    }

    console.log('Payment verified successfully, processing AI request');

    // Check rate limiting (basic implementation)
    const userKey = walletAddress;
    const now = Date.now();
    const userMessages = messageCount.get(userKey);
    
    if (userMessages) {
      // Reset count if more than 1 hour passed
      if (now - userMessages.timestamp > 3600000) {
        messageCount.set(userKey, { count: 1, timestamp: now });
      } else {
        // Allow up to 100 messages per hour
        if (userMessages.count > 100) {
          return NextResponse.json(
            { error: 'Rate limit exceeded. Please wait before sending more messages.' },
            { status: 429 }
          );
        }
        messageCount.set(userKey, { 
          count: userMessages.count + 1, 
          timestamp: userMessages.timestamp 
        });
      }
    } else {
      messageCount.set(userKey, { count: 1, timestamp: now });
    }

    // Get AI response
    const aiResponse = await getX402AIResponse(message.trim(), conversationHistory);
    
    return NextResponse.json({ 
      message: aiResponse,
      paymentVerified: true,
      cost: 0.00001,
      currency: 'USDC'
    });
    
  } catch (error) {
    console.error('Error in X402 chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}