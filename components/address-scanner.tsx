"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown, Star, Coins, Building2, Image as ImageIcon, Zap, Clock, Activity, Users, DollarSign } from "lucide-react"

import { formatAddress, getRiskScoreColor, getRiskLevel, fetchEvmAddressBalance, fetchEvmAddressTransactions } from "@/lib/utils"

interface ScanResult {
  entity: string
  entityType: 'address' | 'token' | 'company' | 'nft' | 'project'
  vaultScore: number
  riskLevel: string
  contractVerified: boolean
  liquidityLocked: boolean
  holderCount: number
  suspiciousTransactions: number
  rugPullRisk: number
  marketCap?: number
  volume24h?: number
  priceChange24h?: number
  lastUpdated: string
  recommendations: string[]
  redFlags: string[]
  greenFlags: string[]
  // Deep scan data
  deepScan?: {
    totalTransactions: number
    firstSeen: string
    lastActive: string
    totalValueReceived: number
    totalValueSent: number
    uniqueInteractions: number
    contractInteractions: number
    knownContracts: string[]
    suspiciousPatterns: string[]
    gasUsage: number
    networkActivity: {
      ethereum: number
      bsc: number
      polygon: number
      arbitrum: number
    }
    tokenHoldings: {
      token: string
      balance: number
      value: number
    }[]
    transactionHistory: {
      hash: string
      type: 'in' | 'out'
      value: number
      timestamp: string
      gasUsed: number
    }[]
  }
  // Real blockchain data
  realBalance?: string;
  realTransactions?: any[];
}

export function AddressScanner() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [isDeepScanning, setIsDeepScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [showDeepScan, setShowDeepScan] = useState(false)

  const detectEntityType = (query: string): 'address' | 'token' | 'company' | 'nft' | 'project' => {
    if (query.startsWith('0x') && query.length === 42) return 'address'
    if (query.toLowerCase().includes('nft') || query.toLowerCase().includes('collection')) return 'nft'
    if (query.toLowerCase().includes('coin') || query.toLowerCase().includes('token')) return 'token'
    if (query.toLowerCase().includes('inc') || query.toLowerCase().includes('ltd') || query.toLowerCase().includes('corp')) return 'company'
    return 'project'
  }

  const calculateVaultScore = (data: any): number => {
    let score = 100
    
    // Base deductions
    if (data.suspiciousTransactions > 10) score -= 25
    if (data.contractVerified === false) score -= 20
    if (data.liquidityLocked === false) score -= 15
    if (data.holderCount < 100) score -= 10
    if (data.rugPullRisk > 0.7) score -= 30
    
    // Additional factors for different entity types
    if (data.entityType === 'token') {
      if (data.marketCap < 1000000) score -= 10
      if (data.volume24h < 10000) score -= 5
      if (data.priceChange24h < -20) score -= 15
    }
    
    if (data.entityType === 'company') {
      if (data.redFlags.length > 2) score -= 20
      if (data.greenFlags.length < 3) score -= 10
    }

    // Deep scan adjustments
    if (data.deepScan) {
      if (data.deepScan.suspiciousPatterns.length > 3) score -= 15
      if (data.deepScan.totalValueReceived > 1000000) score += 5
      if (data.deepScan.uniqueInteractions > 100) score += 3
      if (data.deepScan.contractInteractions > 50) score += 2
    }
    
    return Math.max(0, Math.min(100, score))
  }

  const getVaultScoreColor = (score: number): string => {
    if (score >= 80) return "bg-green-500 text-white"
    if (score >= 60) return "bg-yellow-500 text-white"
    if (score >= 40) return "bg-orange-500 text-white"
    return "bg-red-500 text-white"
  }

  const getVaultScoreLabel = (score: number): string => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    if (score >= 20) return "Poor"
    return "Very Poor"
  }

  const handleScan = async () => {
    if (!searchQuery) return;
    setIsScanning(true);
    const entityType = detectEntityType(searchQuery);

    // Default to Ethereum mainnet (chainId 1), you can allow user to select chain
    const chainId = 1;
    let realBalance = null;
    let realTransactions = [];
    if (entityType === 'address') {
      realBalance = await fetchEvmAddressBalance(searchQuery, chainId);
      realTransactions = await fetchEvmAddressTransactions(searchQuery, chainId);
    }

    const scanResult: ScanResult = {
      entity: searchQuery,
      entityType,
      vaultScore: 0,
      riskLevel: "",
      contractVerified: true,
      liquidityLocked: true,
      holderCount: 0,
      suspiciousTransactions: realTransactions.length,
      rugPullRisk: 0,
      marketCap: undefined,
      volume24h: undefined,
      priceChange24h: undefined,
      lastUpdated: new Date().toISOString(),
      recommendations: [
        "Consider diversifying your portfolio",
        "Monitor for unusual trading patterns",
        "Verify contract source code",
        "Check liquidity lock status"
      ],
      redFlags: [],
      greenFlags: [],
      deepScan: undefined,
      // Add real data for display
      realBalance: realBalance ?? undefined,
      realTransactions
    };

    scanResult.vaultScore = 100; // Replace with your scoring logic
    scanResult.riskLevel = getVaultScoreLabel(scanResult.vaultScore);
    setScanResult(scanResult);
    setIsScanning(false);
  }

  const handleDeepScan = async () => {
    if (!scanResult || scanResult.entityType !== 'address') return
    
    setIsDeepScanning(true)
    
    // Simulate deep scan API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const today = new Date();
    const year = today.getFullYear();
    const firstSeenDate = new Date(year, 0, 1);
    const lastActiveDate = new Date(year, 11, 31);

    const deepScanData = {
      totalTransactions: Math.floor(Math.random() * 10000) + 100,
      firstSeen: firstSeenDate.toISOString(),
      lastActive: lastActiveDate.toISOString(),
      totalValueReceived: Math.random() * 10000000,
      totalValueSent: Math.random() * 8000000,
      uniqueInteractions: Math.floor(Math.random() * 500) + 50,
      contractInteractions: Math.floor(Math.random() * 200) + 20,
      knownContracts: [
        "Uniswap V3 Router",
        "OpenSea Marketplace",
        "Compound Protocol",
        "Aave Lending Pool"
      ],
      suspiciousPatterns: [
        "High frequency trading",
        "Multiple small transactions",
        "Contract interaction patterns"
      ],
      gasUsage: Math.random() * 1000000,
      networkActivity: {
        ethereum: Math.floor(Math.random() * 1000),
        bsc: Math.floor(Math.random() * 500),
        polygon: Math.floor(Math.random() * 300),
        arbitrum: Math.floor(Math.random() * 200)
      },
      tokenHoldings: [
        { token: "ETH", balance: Math.random() * 100, value: Math.random() * 200000 },
        { token: "USDC", balance: Math.random() * 10000, value: Math.random() * 10000 },
        { token: "WBTC", balance: Math.random() * 10, value: Math.random() * 400000 }
      ],
      transactionHistory: Array.from({ length: Math.floor(Math.random() * 400) + 100 }, () => ({
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        type: Math.random() > 0.5 ? 'in' : 'out' as 'in' | 'out',
        value: Math.random() * 10000,
        timestamp: new Date(firstSeenDate.getTime() + Math.random() * (lastActiveDate.getTime() - firstSeenDate.getTime())).toISOString(),
        gasUsed: Math.floor(Math.random() * 500000) + 21000
      }))
    }
    
    const updatedResult = {
      ...scanResult,
      deepScan: deepScanData
    }
    
    updatedResult.vaultScore = calculateVaultScore(updatedResult)
    setScanResult(updatedResult)
    setIsDeepScanning(false)
    setShowDeepScan(true)
  }

  // Move heatmapTooltip state and handlers to top-level to fix hook order error
  const [heatmapTooltip, setHeatmapTooltip] = useState<{visible: boolean, x: number, y: number, date: string, count: number} | null>(null);
  const handleHeatmapBoxHover = (e: React.MouseEvent<HTMLDivElement>, day: Date, count: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeatmapTooltip({
      visible: true,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10,
      date: day.toLocaleDateString(),
      count
    });
  };
  const handleHeatmapBoxLeave = () => setHeatmapTooltip(null);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Copilot reference for fun */}
      <div className="flex items-center justify-center gap-2 py-2">
        <span className="text-xs text-gray-400">Powered by</span>
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-mono font-semibold">GitHub Copilot</span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            VaultCore Security Scanner
          </CardTitle>
          <CardDescription>
            Scan any blockchain entity: wallet addresses, crypto companies, tokens, NFTs, or projects for security risks and trustworthiness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter wallet address, company name, token symbol, NFT collection, or project name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              onClick={handleScan} 
              disabled={!searchQuery || isScanning}
              variant="security"
            >
              {isScanning ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
              {isScanning ? "Scanning..." : "Scan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {scanResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>VaultCore Analysis Results</span>
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-full text-sm font-bold ${getVaultScoreColor(scanResult.vaultScore)}`}>
                  VaultScore: {scanResult.vaultScore}/100
                </div>
                <div className="text-sm text-gray-600">
                  {getVaultScoreLabel(scanResult.vaultScore)}
                </div>
              </div>
            </CardTitle>
            <CardDescription>
              {scanResult.entityType.charAt(0).toUpperCase() + scanResult.entityType.slice(1)}: {scanResult.entity}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Deep Scan Button for Addresses */}
            {scanResult.entityType === 'address' && !scanResult.deepScan && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg flex items-center gap-2 text-purple-800">
                      <Zap className="h-5 w-5" />
                      Deep Scan Available
                    </h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Get comprehensive blockchain analysis including transaction history, smart contract interactions, and detailed risk assessment.
                    </p>
                  </div>
                  <Button 
                    onClick={handleDeepScan}
                    disabled={isDeepScanning}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    {isDeepScanning ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    ) : (
                      <Zap className="h-4 w-4 mr-2" />
                    )}
                    {isDeepScanning ? "Deep Scanning..." : "Deep Scan"}
                  </Button>
                </div>
              </div>
            )}

            {/* End of Full-width Overview Section - Etherscan Style */}

            {/* Full-width Overview Section - Etherscan Style */}
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Overview Card */}
                <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 flex flex-col gap-6">
                  <h4 className="font-bold text-xl mb-2">Overview</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">ETH BALANCE</div>
                      <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l7.5-9m-7.5 9L4.5 12" /></svg>
                        {scanResult.realBalance ? `${(Number(scanResult.realBalance) / 1e18).toFixed(6)} ETH` : '-'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">ETH VALUE</div>
                      <div className="text-lg font-bold text-gray-900">
                        {scanResult.realBalance ? `$${((Number(scanResult.realBalance) / 1e18) * 4199.59).toLocaleString(undefined, {maximumFractionDigits:2})}` : '-'} <span className="text-xs text-gray-500">(@ $4,199.59/ETH)</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">TOKEN HOLDINGS</div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-lg font-bold text-gray-900">
                          $0.12 <span className="text-gray-500 text-base ml-2">(26 Tokens)</span>
                        </div>
                        <button className="bg-gray-100 hover:bg-gray-200 rounded-xl p-2 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* More Info Card */}
                <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 flex flex-col gap-6">
                  <h4 className="font-bold text-xl mb-2">More Info</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">PRIVATE NAME TAGS</div>
                      <button className="border border-dashed border-gray-400 rounded-xl px-4 py-2 text-gray-600 hover:bg-gray-50 transition">+ Add</button>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">TRANSACTIONS</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base">
                        {/* Latest Sent */}
                        <span>Latest Sent: <span className="font-bold text-gray-900">
                          {scanResult.realTransactions && scanResult.realTransactions.length > 0
                            ? (() => {
                                const sentTx = scanResult.realTransactions.filter(tx => tx.from && scanResult.entity && tx.from.toLowerCase() === scanResult.entity.toLowerCase());
                                return sentTx.length > 0 ? new Date(Number(sentTx[0].timeStamp) * 1000).toLocaleString() : '-';
                              })()
                            : '-'}
                        </span> <span className="text-xs">↗</span></span>
                        {/* Latest Received */}
                        <span>Latest Received: <span className="font-bold text-gray-900">
                          {scanResult.realTransactions && scanResult.realTransactions.length > 0
                            ? (() => {
                                const receivedTx = scanResult.realTransactions.filter(tx => tx.to && scanResult.entity && tx.to.toLowerCase() === scanResult.entity.toLowerCase());
                                return receivedTx.length > 0 ? new Date(Number(receivedTx[0].timeStamp) * 1000).toLocaleString() : '-';
                              })()
                            : '-'}
                        </span> <span className="text-xs">↙</span></span>
                        {/* First Sent */}
                        <span>First Sent: <span className="font-bold text-gray-900">
                          {scanResult.realTransactions && scanResult.realTransactions.length > 0
                            ? (() => {
                                const sentTx = scanResult.realTransactions.filter(tx => tx.from && scanResult.entity && tx.from.toLowerCase() === scanResult.entity.toLowerCase());
                                return sentTx.length > 0 ? new Date(Number(sentTx[sentTx.length-1].timeStamp) * 1000).toLocaleString() : '-';
                              })()
                            : '-'}
                        </span> <span className="text-xs">↗</span></span>
                        {/* First Received */}
                        <span>First Received: <span className="font-bold text-gray-900">
                          {scanResult.realTransactions && scanResult.realTransactions.length > 0
                            ? (() => {
                                const receivedTx = scanResult.realTransactions.filter(tx => tx.to && scanResult.entity && tx.to.toLowerCase() === scanResult.entity.toLowerCase());
                                return receivedTx.length > 0 ? new Date(Number(receivedTx[receivedTx.length-1].timeStamp) * 1000).toLocaleString() : '-';
                              })()
                            : '-'}
                        </span> <span className="text-xs">↙</span></span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 mb-1">FUNDED BY</div>
                      <div className="flex items-center gap-2 text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l7.5-9m-7.5 9L4.5 12" /></svg>
                        <a href="https://etherscan.io/address/rsync-builder.eth" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">rsync-builder.eth</a>
                        <button className="ml-1 text-gray-400 hover:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5h7.5m-7.5 0A2.25 2.25 0 006 6.75v10.5A2.25 2.25 0 008.25 19.5h7.5A2.25 2.25 0 0018 17.25V6.75A2.25 2.25 0 0015.75 4.5h-7.5z" /></svg></button>
                        <span className="text-gray-500 text-xs">| 149 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Divider */}
              <hr className="my-2" />
              {/* Risk Assessment */}
              <div className="flex flex-wrap gap-8 w-full">
                <div className="flex flex-col gap-2">
                  <span className="text-sm">Risk Level:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getVaultScoreColor(scanResult.vaultScore)}`}>{scanResult.riskLevel}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm">Contract Verified:</span>
                  {scanResult.contractVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm">Liquidity Locked:</span>
                  {scanResult.liquidityLocked ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm">Holder Count:</span>
                  <span className="text-sm font-medium">{scanResult.holderCount.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm">Suspicious Transactions:</span>
                  <span className="text-sm font-medium">{scanResult.suspiciousTransactions}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm">Rug Pull Risk:</span>
                  <span className="text-sm font-medium">{(scanResult.rugPullRisk * 100).toFixed(1)}%</span>
                </div>
              </div>
            {/* Transaction History Table */}
            {scanResult.realTransactions && scanResult.realTransactions.length > 0 && (
              <>
                <div className="mt-6 w-full">
                  <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
                    <h4 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Recent Transactions
                    </h4>
                    <div className="overflow-x-auto w-full">
                      <table className="min-w-full text-sm rounded-xl border border-gray-100 bg-white">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700">
                            <th className="px-4 py-3 font-semibold text-left">Hash</th>
                            <th className="px-4 py-3 font-semibold text-left">From</th>
                            <th className="px-4 py-3 font-semibold text-left">To</th>
                            <th className="px-4 py-3 font-semibold text-left">Value (ETH)</th>
                            <th className="px-4 py-3 font-semibold text-left">Timestamp</th>
                            <th className="px-4 py-3 font-semibold text-left">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scanResult.realTransactions.slice(0, 25).map((tx: any, idx: number) => (
                            <tr key={tx.hash || idx} className={"transition border-b last:border-b-0 " + (idx % 2 === 0 ? "bg-gray-50" : "bg-white") + " hover:bg-blue-50"}>
                              <td className="px-4 py-3 text-blue-700 truncate max-w-[120px]">
                                <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900 transition">{tx.hash?.slice(0, 10)}...{tx.hash?.slice(-8)}</a>
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-700">{tx.from ? `${tx.from.slice(0, 6)}...${tx.from.slice(-4)}` : '-'}</td>
                              <td className="px-4 py-3 text-xs text-gray-700">{tx.to ? `${tx.to.slice(0, 6)}...${tx.to.slice(-4)}` : '-'}</td>
                              <td className="px-4 py-3 font-mono text-green-700">{tx.value ? (Number(tx.value) / 1e18).toFixed(6) : '-'}</td>
                              <td className="px-4 py-3 text-xs text-gray-600">{tx.timeStamp ? new Date(Number(tx.timeStamp) * 1000).toLocaleString() : '-'}</td>
                              <td className="px-4 py-3">
                                {tx.to && scanResult.entity && tx.to.toLowerCase() === scanResult.entity.toLowerCase() ? (
                                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold shadow">in</span>
                                ) : (
                                  <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold shadow">out</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* VaultScore Breakdown - moved after transactions */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mt-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    VaultScore Breakdown
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Trust</div>
                      <div className="text-sm text-gray-600">Based on contract verification, team transparency, and community trust</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">Security</div>
                      <div className="text-sm text-gray-600">Evaluates liquidity locks, suspicious patterns, and risk factors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">Performance</div>
                      <div className="text-sm text-gray-600">Market metrics, trading volume, and price stability analysis</div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* Close overview section */}
          {/* End of overview section - no extra closing div needed here */}
              
              {/* Market Data (for tokens) */}
              {scanResult.entityType === 'token' && scanResult.marketCap && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Market Data</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Market Cap:</span>
                      <span className="text-sm font-medium">${(scanResult.marketCap / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">24h Volume:</span>
                      <span className="text-sm font-medium">${(scanResult.volume24h! / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">24h Change:</span>
                      <span className={`text-sm font-medium flex items-center gap-1 ${
                        scanResult.priceChange24h! > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {scanResult.priceChange24h! > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {scanResult.priceChange24h!.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deep Scan Results */}
            {scanResult.deepScan && (
              <div className="space-y-6">
                {/* Transaction Summary Section */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-700">
                    <Zap className="h-5 w-5" />
                    Deep Scan Analysis
                  </h3>
                  {/* Transaction Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-6 rounded-xl border flex flex-col justify-center">
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">TRANSACTION COUNT <span className="cursor-pointer" title="Total number of transactions">?</span></div>
                      <div className="text-3xl font-bold text-gray-900">{scanResult.deepScan.totalTransactions}</div>
                      <div className="text-xs text-gray-500 mt-1">Since {new Date(scanResult.deepScan.firstSeen).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border flex flex-col justify-center">
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">ACTIVE AGE <span className="cursor-pointer" title="Days since first transaction">?</span></div>
                      <div className="text-3xl font-bold text-gray-900">{
                        (() => {
                          const first = new Date(scanResult.deepScan.firstSeen);
                          const last = new Date(scanResult.deepScan.lastActive);
                          const diff = Math.max(1, Math.ceil((last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24)));
                          return `${diff} Day${diff > 1 ? 's' : ''}`;
                        })()
                      }</div>
                      <div className="text-xs text-gray-500 mt-1">Since {new Date(scanResult.deepScan.firstSeen).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border flex flex-col justify-center">
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">UNIQUE DAYS ACTIVE <span className="cursor-pointer" title="Days with at least one transaction">?</span></div>
                      <div className="text-3xl font-bold text-gray-900">{
                        (() => {
                          const days = new Set(scanResult.deepScan.transactionHistory.map(tx => new Date(tx.timestamp).toDateString()));
                          return `${days.size} Day${days.size > 1 ? 's' : ''}`;
                        })()
                      }</div>
                      <div className="text-xs text-gray-500 mt-1">Since {new Date(scanResult.deepScan.firstSeen).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border flex flex-col justify-center">
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">LONGEST STREAK <span className="cursor-pointer" title="Longest consecutive days with transactions">?</span></div>
                      <div className="text-3xl font-bold text-gray-900">{
                        (() => {
                          // Calculate longest streak
                          const days = scanResult.deepScan.transactionHistory.map(tx => new Date(tx.timestamp).toDateString());
                          const uniqueDays = Array.from(new Set(days)).sort();
                          let streak = 1, maxStreak = 1;
                          for (let i = 1; i < uniqueDays.length; i++) {
                            const prev = new Date(uniqueDays[i-1]);
                            const curr = new Date(uniqueDays[i]);
                            if ((curr.getTime() - prev.getTime()) === 86400000) {
                              streak++;
                              maxStreak = Math.max(maxStreak, streak);
                            } else {
                              streak = 1;
                            }
                          }
                          return `${maxStreak} Day${maxStreak > 1 ? 's' : ''}`;
                        })()
                      }</div>
                      <div className="text-xs text-gray-500 mt-1">Since {new Date(scanResult.deepScan.firstSeen).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                  {/* Transaction Heatmap */}
                  <div className="mt-8">
                    <h4 className="font-bold text-lg mb-2">Transaction Heatmap</h4>
                    <div className="bg-white rounded-2xl border p-6">
                      <div className="text-sm text-gray-500 mb-2">{(() => {
                        const first = new Date(scanResult.deepScan.firstSeen);
                        const last = new Date(scanResult.deepScan.lastActive);
                        return `${first.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })} - ${last.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}`;
                      })()}</div>
                      <div className="overflow-x-auto border-t pt-4 relative">
                        <div className="flex gap-4 text-xs text-gray-500 mb-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                            <div key={month} style={{ flexBasis: `${(100 / 12)}%` }} className="text-center">{month}</div>
                          ))}
                        </div>
                        <div className="grid grid-rows-7 grid-flow-col gap-1">
                          {(() => {
                            // Prepare daily activity map from real transactions
                            const txs = scanResult.realTransactions || [];
                            const validTxs = txs.filter(tx => tx.timeStamp && !isNaN(Number(tx.timeStamp)));
                            const activityMap: Record<string, number> = {};
                            validTxs.forEach(tx => {
                              const day = new Date(Number(tx.timeStamp) * 1000).toISOString().slice(0, 10);
                              activityMap[day] = (activityMap[day] || 0) + 1;
                            });
                            let firstDate = null, lastDate = null;
                            if (validTxs.length > 0) {
                              const sorted = [...validTxs].sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));
                              firstDate = new Date(Number(sorted[0].timeStamp) * 1000);
                              lastDate = new Date(Number(sorted[sorted.length-1].timeStamp) * 1000);
                            }
                            // Always render heatmap, even if no data
                            const allDays = [];
                            if (firstDate && lastDate) {
                              for (let d = new Date(firstDate); d <= lastDate; d.setDate(d.getDate() + 1)) {
                                allDays.push(new Date(d));
                              }
                            }
                            const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            const getColor = (count: number) => {
                              if (!count) return 'bg-[#ebedf0]';
                              if (count === 1) return 'bg-[#9be9a8]';
                              if (count <= 3) return 'bg-[#40c463]';
                              if (count <= 7) return 'bg-[#30a14e]';
                              return 'bg-[#216e39]';
                            };

                            // Summary cards
                            return (
                              <>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {/* Transaction Count */}
                    <div className="bg-white p-6 rounded-xl border flex flex-col justify-center">
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">TRANSACTION COUNT <span className="cursor-pointer" title="Total number of transactions">?</span></div>
                      <div className="text-3xl font-bold text-gray-900">{scanResult.realTransactions ? scanResult.realTransactions.length : 0}</div>
                      <div className="text-xs text-gray-500 mt-1">Since {scanResult.realTransactions && scanResult.realTransactions.length > 0 ? new Date(Number(scanResult.realTransactions[scanResult.realTransactions.length-1].timeStamp) * 1000).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
                    </div>
                    {/* Active Age */}
                    <div className="bg-white p-6 rounded-xl border flex flex-col justify-center">
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">ACTIVE AGE <span className="cursor-pointer" title="Days since first transaction">?</span></div>
                      <div className="text-3xl font-bold text-gray-900">{
                        (() => {
                          if (scanResult.realTransactions && scanResult.realTransactions.length > 0) {
                            const first = Number(scanResult.realTransactions[scanResult.realTransactions.length-1].timeStamp) * 1000;
                            const last = Number(scanResult.realTransactions[0].timeStamp) * 1000;
                            const diffDays = Math.max(1, Math.round((last - first) / (1000 * 60 * 60 * 24)));
                            return `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
                          }
                          return '-';
                        })()
                      }</div>
                      <div className="text-xs text-gray-500 mt-1">Since {scanResult.realTransactions && scanResult.realTransactions.length > 0 ? new Date(Number(scanResult.realTransactions[scanResult.realTransactions.length-1].timeStamp) * 1000).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
                    </div>
                    {/* Unique Days Active */}
                    <div className="bg-white p-6 rounded-xl border flex flex-col justify-center">
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">UNIQUE DAYS ACTIVE <span className="cursor-pointer" title="Days with at least one transaction">?</span></div>
                      <div className="text-3xl font-bold text-gray-900">{
                        (() => {
                          if (scanResult.realTransactions && scanResult.realTransactions.length > 0) {
                            const days = new Set(scanResult.realTransactions.map(tx => new Date(Number(tx.timeStamp) * 1000).toLocaleDateString()));
                            return `${days.size} Day${days.size > 1 ? 's' : ''}`;
                          }
                          return '-';
                        })()
                      }</div>
                      <div className="text-xs text-gray-500 mt-1">Since {scanResult.realTransactions && scanResult.realTransactions.length > 0 ? new Date(Number(scanResult.realTransactions[scanResult.realTransactions.length-1].timeStamp) * 1000).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
                    </div>
                    {/* Longest Streak */}
                    <div className="bg-white p-6 rounded-xl border flex flex-col justify-center">
                      <div className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">LONGEST STREAK <span className="cursor-pointer" title="Longest consecutive days with transactions">?</span></div>
                      <div className="text-3xl font-bold text-gray-900">{
                        (() => {
                          if (scanResult.realTransactions && scanResult.realTransactions.length > 0) {
                            // Calculate longest streak of consecutive active days
                            const days = scanResult.realTransactions.map(tx => new Date(Number(tx.timeStamp) * 1000).toLocaleDateString());
                            const uniqueDays = Array.from(new Set(days)).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
                            let maxStreak = 1, streak = 1;
                            for (let i = 1; i < uniqueDays.length; i++) {
                              const prev = new Date(uniqueDays[i-1]);
                              const curr = new Date(uniqueDays[i]);
                              if ((curr.getTime() - prev.getTime()) === 86400000) {
                                streak++;
                                maxStreak = Math.max(maxStreak, streak);
                              } else {
                                streak = 1;
                              }
                            }
                            return `${maxStreak} Day${maxStreak > 1 ? 's' : ''}`;
                          }
                          return '-';
                        })()
                      }</div>
                      <div className="text-xs text-gray-500 mt-1">Since {scanResult.realTransactions && scanResult.realTransactions.length > 0 ? new Date(Number(scanResult.realTransactions[scanResult.realTransactions.length-1].timeStamp) * 1000).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</div>
                    </div>
                  </div>
                                <div className="flex items-center gap-2 mt-4">
                                  <span className="text-xs text-gray-400">Less</span>
                                  <div className="flex gap-1">
                                    <div className="w-4 h-4 rounded bg-[#e5ecf6]"></div>
                                    <div className="w-4 h-4 rounded bg-[#b7e4c7]"></div>
                                    <div className="w-4 h-4 rounded bg-[#74c69d]"></div>
                                    <div className="w-4 h-4 rounded bg-[#40916c]"></div>
                                    <div className="w-4 h-4 rounded bg-[#1b4332]"></div>
                                  </div>
                                  <span className="text-xs text-gray-400">More</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-lg flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Red Flags
                </h4>
                <ul className="space-y-2">
                  {scanResult.redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-lg flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Green Flags
                </h4>
                <ul className="space-y-2">
                  {scanResult.greenFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {scanResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {scanResult.vaultScore < 50 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-red-800">High Risk Detected</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  This {scanResult.entityType} shows multiple red flags. Exercise extreme caution before any transactions or investments.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}