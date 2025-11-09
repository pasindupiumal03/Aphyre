import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, TransactionInstruction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Constants
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // USDC mint address on Solana mainnet
const RECIPIENT_ADDRESS = new PublicKey('Aphyre1111111111111111111111111111111111111'); // Aphyre recipient address (44 chars)
const RPC_ENDPOINT = 'https://rpc-mainnet.solanatracker.io/?api_key=8b90bec5-e575-4212-9c39-4e2496f29a2f';
const PAYMENT_AMOUNT = 0.00001; // 0.00001 USDC per chat

export interface PaymentRequest {
  userPublicKey: PublicKey;
  amount: number;
  memo?: string;
}

export interface PaymentResult {
  success: boolean;
  transaction?: Transaction;
  signature?: string;
  error?: string;
}

export class USDCPaymentService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(RPC_ENDPOINT, 'confirmed');
  }

  // Create a USDC transfer transaction
  async createPaymentTransaction({
    userPublicKey,
    amount = PAYMENT_AMOUNT,
    memo = 'X402 Chat Payment'
  }: PaymentRequest): Promise<PaymentResult> {
    try {
      // Get user's USDC token account
      const userUSDCAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        userPublicKey
      );

      // Get recipient's USDC token account
      const recipientUSDCAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        RECIPIENT_ADDRESS
      );

      // Check if accounts exist
      const userAccountInfo = await this.connection.getAccountInfo(userUSDCAccount);
      if (!userAccountInfo) {
        return {
          success: false,
          error: 'User does not have a USDC token account. Please ensure you have USDC tokens.'
        };
      }

      const recipientAccountInfo = await this.connection.getAccountInfo(recipientUSDCAccount);
      if (!recipientAccountInfo) {
        return {
          success: false,
          error: 'Recipient USDC token account does not exist.'
        };
      }

      // Convert amount to smallest unit (USDC has 6 decimals)
      const transferAmount = Math.floor(amount * 1_000_000);

      // Create transaction
      const transaction = new Transaction();

      // Add memo instruction if provided
      if (memo) {
        const memoInstruction = new TransactionInstruction({
          keys: [],
          programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
          data: Buffer.from(memo, 'utf8'),
        });
        transaction.add(memoInstruction);
      }

      // Add transfer instruction
      const transferInstruction = createTransferInstruction(
        userUSDCAccount,
        recipientUSDCAccount,
        userPublicKey,
        transferAmount,
        [],
        TOKEN_PROGRAM_ID
      );

      transaction.add(transferInstruction);

      // Get latest blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      return {
        success: true,
        transaction
      };
    } catch (error) {
      console.error('Error creating payment transaction:', error);
      return {
        success: false,
        error: `Failed to create transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Verify a payment transaction
  async verifyPayment(signature: string): Promise<boolean> {
    try {
      const transaction = await this.connection.getTransaction(signature, {
        commitment: 'confirmed'
      });

      if (!transaction || transaction.meta?.err) {
        return false;
      }

      // Additional verification can be added here
      // e.g., check transfer amount, recipient, etc.
      return true;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }

  // Get user's USDC balance
  async getUserUSDCBalance(userPublicKey: PublicKey): Promise<number> {
    try {
      const userUSDCAccount = await getAssociatedTokenAddress(
        USDC_MINT,
        userPublicKey
      );

      const balance = await this.connection.getTokenAccountBalance(userUSDCAccount);
      return parseFloat(balance.value.uiAmount?.toString() || '0');
    } catch (error) {
      console.error('Error getting USDC balance:', error);
      return 0;
    }
  }

  // Check if user has enough USDC for payment
  async checkSufficientFunds(userPublicKey: PublicKey, amount: number = PAYMENT_AMOUNT): Promise<boolean> {
    const balance = await this.getUserUSDCBalance(userPublicKey);
    return balance >= amount;
  }
}

export const paymentService = new USDCPaymentService();
export { PAYMENT_AMOUNT, RECIPIENT_ADDRESS };