import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B'
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M'
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K'
  }
  return num.toString()
}

export function getRiskScoreColor(score: number): string {
  if (score >= 80) return "risk-score-high"
  if (score >= 50) return "risk-score-medium"
  return "risk-score-low"
}

export function getRiskLevel(score: number): string {
  if (score >= 80) return "High Risk"
  if (score >= 50) return "Medium Risk"
  return "Low Risk"
}


// Unified Etherscan V2 API for multichain support
export async function fetchEvmAddressBalance(address: string, chainId: number): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_ETHERSCAN_API_URL;
  const url = `${apiUrl}?chainid=${chainId}&module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result; // balance in wei
}

export async function fetchEvmAddressTransactions(address: string, chainId: number): Promise<any[]> {
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_ETHERSCAN_API_URL;
  const url = `${apiUrl}?chainid=${chainId}&module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result; // array of transactions
}