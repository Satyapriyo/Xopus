"use client";



import { parseEther } from "viem";

const ETH_USD_PRICE_FEED = "0x7eed379bf00005CfeDF2D5eA59C7368AC373c303";

export const getPaymentAmountInWei = (usdAmount: number) => {

  return parseEther("0.000005");
};
