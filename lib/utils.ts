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

export function calculateTrustScore(data: any): number {
  // Mock trust score calculation
  let score = 100
  
  // Reduce score based on various factors
  if (data.suspiciousTransactions > 10) score -= 30
  if (data.contractVerified === false) score -= 25
  if (data.liquidityLocked === false) score -= 20
  if (data.holderCount < 100) score -= 15
  if (data.rugPullRisk > 0.7) score -= 40
  
  return Math.max(0, score)
} 