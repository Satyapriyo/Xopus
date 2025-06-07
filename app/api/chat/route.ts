// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";

interface PaymentProof {
  txHash: string;
  amount: string;
  timestamp: number;
  message: string;
  address: string;
}

interface PaymentHeader {
  proof: PaymentProof;
  signature: string;
}

class PaymentVerificationService {
  private static instance: PaymentVerificationService;
  private verifiedPayments = new Set<string>();

  public static getInstance(): PaymentVerificationService {
    if (!PaymentVerificationService.instance) {
      PaymentVerificationService.instance = new PaymentVerificationService();
    }
    return PaymentVerificationService.instance;
  }

  public async verifyPayment(
    paymentHeader: string
  ): Promise<{ valid: boolean; error?: string }> {
    try {
      // Decode payment header
      const decoded = JSON.parse(atob(paymentHeader)) as PaymentHeader;
      const { proof, signature } = decoded;

      // Check if payment was already used
      if (this.verifiedPayments.has(proof.txHash)) {
        return { valid: false, error: "Payment already used" };
      }

      // Verify timestamp (payment should be recent, within 10 minutes)
      const now = Date.now();
      const paymentAge = now - proof.timestamp;
      if (paymentAge > 10 * 60 * 1000) {
        // 10 minutes
        return { valid: false, error: "Payment expired" };
      }

      // Verify signature
      const message = JSON.stringify(proof);
      const isValidSignature = await verifyMessage({
        message,
        signature: signature as `0x${string}`,
        address: proof.address as `0x${string}`,
      });

      if (!isValidSignature) {
        return { valid: false, error: "Invalid signature" };
      }

      // Verify transaction on-chain
      const isValidTransaction = await this.verifyTransactionOnChain(
        proof.txHash,
        proof.amount,
        proof.address
      );

      if (!isValidTransaction) {
        return { valid: false, error: "Invalid transaction" };
      }

      // Mark payment as used
      this.verifiedPayments.add(proof.txHash);

      return { valid: true };
    } catch (error) {
      console.error("Payment verification error:", error);
      return { valid: false, error: "Payment verification failed" };
    }
  }

  private async verifyTransactionOnChain(
    txHash: string,
    expectedAmount: string,
    senderAddress: string
  ): Promise<boolean> {
    try {
      // Verify transaction using Base API or your preferred method
      const response = await fetch(
        `https://api.basescan.org/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${process.env.BASESCAN_API_KEY}`
      );

      const data = await response.json();
      const tx = data.result;

      if (!tx) {
        return false;
      }

      // Verify transaction details
      const isCorrectSender =
        tx.from.toLowerCase() === senderAddress.toLowerCase();
      const isCorrectReceiver =
        tx.to.toLowerCase() === process.env.PAYMENT_ADDRESS?.toLowerCase();
      const isCorrectAmount = BigInt(tx.value) >= BigInt(expectedAmount);

      // Verify transaction is confirmed
      const receiptResponse = await fetch(
        `https://api.basescan.org/api?module=proxy&action=eth_getTransactionReceipt&txhash=${txHash}&apikey=${process.env.BASESCAN_API_KEY}`
      );

      const receiptData = await receiptResponse.json();
      const receipt = receiptData.result;

      const isConfirmed = receipt && receipt.status === "0x1";

      return (
        isCorrectSender && isCorrectReceiver && isCorrectAmount && isConfirmed
      );
    } catch (error) {
      console.error("Transaction verification error:", error);
      return false;
    }
  }
}

// Rate limiting service
class RateLimitService {
  private static instance: RateLimitService;
  private requests = new Map<string, { count: number; resetTime: number }>();

  public static getInstance(): RateLimitService {
    if (!RateLimitService.instance) {
      RateLimitService.instance = new RateLimitService();
    }
    return RateLimitService.instance;
  }

  public checkRateLimit(ip: string): {
    allowed: boolean;
    remainingRequests?: number;
  } {
    const now = Date.now();
    const windowSize = 60 * 1000; // 1 minute
    const maxRequests = 10; // 10 requests per minute for free users

    const userRequests = this.requests.get(ip);

    if (!userRequests || now > userRequests.resetTime) {
      // Reset or initialize
      this.requests.set(ip, { count: 1, resetTime: now + windowSize });
      return { allowed: true, remainingRequests: maxRequests - 1 };
    }

    if (userRequests.count >= maxRequests) {
      return { allowed: false };
    }

    userRequests.count++;
    return {
      allowed: true,
      remainingRequests: maxRequests - userRequests.count,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown";

    // Check payment header
    const paymentHeader = request.headers.get("X-PAYMENT");

    if (!paymentHeader) {
      // No payment provided, check rate limit
      const rateLimitService = RateLimitService.getInstance();
      const rateLimit = rateLimitService.checkRateLimit(ip);

      if (!rateLimit.allowed) {
        return NextResponse.json(
          {
            error: "Payment required",
            message: "Rate limit exceeded. Please make a payment to continue.",
            paymentRequired: true,
            pricePerQuery:
              process.env.NEXT_PUBLIC_PRICE_PER_QUERY || "1000000000000000",
          },
          {
            status: 402,
            headers: {
              "X-RateLimit-Remaining": "0",
              "Access-Control-Expose-Headers": "X-RateLimit-Remaining",
            },
          }
        );
      }
    } else {
      // Verify payment
      const paymentService = PaymentVerificationService.getInstance();
      const verification = await paymentService.verifyPayment(paymentHeader);

      if (!verification.valid) {
        return NextResponse.json(
          {
            error: "Invalid payment",
            details: verification.error,
            paymentRequired: true,
          },
          { status: 402 }
        );
      }
    }

    // Process the AI request (replace with your actual AI service)
    const aiResponse = await processAIRequest(message);

    // Return response with payment confirmation if payment was made
    const response = NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      paymentVerified: !!paymentHeader,
    });

    if (paymentHeader) {
      response.headers.set("X-PAYMENT-RESPONSE", "verified");
      response.headers.set(
        "Access-Control-Expose-Headers",
        "X-PAYMENT-RESPONSE"
      );
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Mock AI processing function - replace with your actual implementation
async function processAIRequest(message: string): Promise<string> {
  // This is where you'd integrate with your AI service
  // For example, using OpenAI, Anthropic, or your custom model

  // Simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return `AI Response to: "${message}"\n\nThis is a simulated response. Replace this function with your actual AI integration using @coinbase/agentkit or your preferred AI service.`;
}

// Handle CORS for preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-PAYMENT",
      "Access-Control-Expose-Headers":
        "X-PAYMENT-RESPONSE, X-RateLimit-Remaining",
    },
  });
}
