// calls.ts
const clickContractAddress = "0x67c97D1FB8184F038592b2109F854dfb09C77C75";
const clickContractAbi = [
  {
    type: "function",
    name: "click",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

// Option 1: Use 'to' instead of 'address' for simple Call format
export const calls = [
  {
    address: clickContractAddress,
    to: clickContractAddress as `0x${string}`, // 'to' is an alias for 'address' in this context
    abi: clickContractAbi,
    functionName: "click",
    args: [],
  },
];

// Option 2: Alternative - Use the full ContractFunctionParameters format
// export const calls = [
//   {
//     address: clickContractAddress,
//     abi: clickContractAbi,
//     functionName: "click",
//     args: [],
//   },
// ] as const;
