// "use client";

// import { useState, useCallback } from "react";
// // import { PayButton, usePayment } from "@coinbase/x402";
// import { useAccount } from "wagmi";
// import { toast } from "@/components/ui/use-toast";
// import { Button } from "@/components/ui/button";

// interface X402PaymentProps {
//   onPaymentSuccess: () => void;
//   isLoading: boolean;
// }

// export const X402Payment = ({ onPaymentSuccess, isLoading }: X402PaymentProps) => {
//   const { address } = useAccount();
//   const [isPaying, setIsPaying] = useState(false);
  
//   const payment = usePayment({
//     onSuccess: () => {
//       setIsPaying(false);
//       onPaymentSuccess();
//       toast({
//         title: "Payment Successful",
//         description: "Your $0.01 payment was processed successfully",
//       });
//     },
//     onError: (error) => {
//       setIsPaying(false);
//       toast({
//         title: "Payment Failed",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const handlePayment = useCallback(async () => {
//     if (!address) {
//       toast({
//         title: "Wallet Not Connected",
//         description: "Please connect your wallet first",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsPaying(true);
//     try {
//       await payment.pay();
//     } catch (error) {
//       setIsPaying(false);
//     }
//   }, [address, payment]);

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Option 1: Using the built-in PayButton */}
//       <PayButton 
//         disabled={isLoading}
//         className="w-full"
//       />

//       {/* Option 2: Using custom button */}
//       <Button
//         onClick={handlePayment}
//         disabled={!address || isPaying || isLoading}
//         className="w-full"
//       >
//         {isPaying ? "Processing Payment..." : "Pay $0.01 to Get Response"}
//       </Button>
      
//       <p className="text-xs text-gray-500 text-center">
//         A payment of $0.01 is required for each AI response
//       </p>
//     </div>
//   );
// };