"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown, Star, Coins, Building2, Image as ImageIcon, Zap, Clock, Activity, Users, DollarSign } from "lucide-react"
import { formatAddress, getRiskScoreColor, getRiskLevel, calculateTrustScore } from "@/lib/utils"

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
    if (!searchQuery) return
    
    setIsScanning(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const entityType = detectEntityType(searchQuery)
    
    // Mock data - in real app, this would come from blockchain APIs
    const mockResult: ScanResult = {
      entity: searchQuery,
      entityType,
      vaultScore: 0, // Will be calculated
      riskLevel: "",
      contractVerified: Math.random() > 0.3,
      liquidityLocked: Math.random() > 0.2,
      holderCount: Math.floor(Math.random() * 10000) + 50,
      suspiciousTransactions: Math.floor(Math.random() * 50),
      rugPullRisk: Math.random(),
      marketCap: entityType === 'token' ? Math.random() * 1000000000 : undefined,
      volume24h: entityType === 'token' ? Math.random() * 10000000 : undefined,
      priceChange24h: entityType === 'token' ? (Math.random() - 0.5) * 100 : undefined,
      lastUpdated: new Date().toISOString(),
      recommendations: [
        "Consider diversifying your portfolio",
        "Monitor for unusual trading patterns",
        "Verify contract source code",
        "Check liquidity lock status"
      ],
      redFlags: [
        "High concentration of tokens in few wallets",
        "Unverified smart contract",
        "Suspicious transaction patterns",
        "Liquidity not locked"
      ],
      greenFlags: [
        "Contract verified on blockchain explorer",
        "Liquidity locked for extended period",
        "Active development team",
        "Transparent tokenomics"
      ]
    }
    
    mockResult.vaultScore = calculateVaultScore(mockResult)
    mockResult.riskLevel = getRiskLevel(mockResult.vaultScore)
    setScanResult(mockResult)
    setIsScanning(false)
  }

  const handleDeepScan = async () => {
    if (!scanResult || scanResult.entityType !== 'address') return
    
    setIsDeepScanning(true)
    
    // Simulate deep scan API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const deepScanData = {
      totalTransactions: Math.floor(Math.random() * 10000) + 100,
      firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date().toISOString(),
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
      transactionHistory: Array.from({ length: 10 }, (_, i) => ({
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        type: Math.random() > 0.5 ? 'in' : 'out' as 'in' | 'out',
        value: Math.random() * 10000,
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
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

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
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

            {/* VaultScore Breakdown */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Risk Assessment */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Risk Assessment</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Level:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskScoreColor(scanResult.vaultScore)}`}>
                      {scanResult.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Contract Verified:</span>
                    {scanResult.contractVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Liquidity Locked:</span>
                    {scanResult.liquidityLocked ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Holder Count:</span>
                    <span className="text-sm font-medium">{scanResult.holderCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suspicious Transactions:</span>
                    <span className="text-sm font-medium">{scanResult.suspiciousTransactions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rug Pull Risk:</span>
                    <span className="text-sm font-medium">{(scanResult.rugPullRisk * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
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
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-700">
                    <Zap className="h-5 w-5" />
                    Deep Scan Analysis
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold">Total Transactions</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{scanResult.deepScan.totalTransactions.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="font-semibold">Unique Interactions</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{scanResult.deepScan.uniqueInteractions}</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-purple-500" />
                        <span className="font-semibold">Total Value</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600">${(scanResult.deepScan.totalValueReceived / 1000000).toFixed(2)}M</div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="font-semibold">First Seen</span>
                      </div>
                      <div className="text-sm font-medium text-orange-600">
                        {new Date(scanResult.deepScan.firstSeen).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Network Activity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Network Activity</h4>
                      <div className="space-y-3">
                        {Object.entries(scanResult.deepScan.networkActivity).map(([network, count]) => (
                          <div key={network} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{network}:</span>
                            <span className="text-sm font-medium">{count} tx</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Token Holdings</h4>
                      <div className="space-y-3">
                        {scanResult.deepScan.tokenHoldings.map((holding, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{holding.token}:</span>
                            <span className="text-sm font-medium">${holding.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Known Contracts */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Known Contract Interactions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scanResult.deepScan.knownContracts.map((contract, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{contract}</span>
                        </div>
                      ))}
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
  )
} 