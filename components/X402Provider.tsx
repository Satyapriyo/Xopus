// "use client";

// import { X402ConfigProvider } from "@coinbase/x402";
// import { baseSepolia } from "viem/chains";

// const x402Config = {
//   chain: baseSepolia,
//   paymentAddress: process.env.NEXT_PUBLIC_X402_PAYMENT_ADDRESS as `0x${string}`,
//   paymentAmount: BigInt("10000000000000000"), // 0.01 ETH equivalent
// };

// export function X402Provider({ children }: { children: React.ReactNode }) {
//   return (
//     <X402ConfigProvider config={x402Config}>
//       {children}
//     </X402ConfigProvider>
//   );
// }