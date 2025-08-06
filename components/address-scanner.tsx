"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { formatAddress, getRiskScoreColor, getRiskLevel, calculateTrustScore } from "@/lib/utils"

interface ScanResult {
  address: string
  trustScore: number
  riskLevel: string
  contractVerified: boolean
  liquidityLocked: boolean
  holderCount: number
  suspiciousTransactions: number
  rugPullRisk: number
  lastUpdated: string
}

export function AddressScanner() {
  const [address, setAddress] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  const handleScan = async () => {
    if (!address) return
    
    setIsScanning(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock data - in real app, this would come from blockchain APIs
    const mockResult: ScanResult = {
      address,
      trustScore: calculateTrustScore({
        suspiciousTransactions: Math.floor(Math.random() * 20),
        contractVerified: Math.random() > 0.3,
        liquidityLocked: Math.random() > 0.2,
        holderCount: Math.floor(Math.random() * 1000) + 50,
        rugPullRisk: Math.random()
      }),
      riskLevel: "",
      contractVerified: Math.random() > 0.3,
      liquidityLocked: Math.random() > 0.2,
      holderCount: Math.floor(Math.random() * 1000) + 50,
      suspiciousTransactions: Math.floor(Math.random() * 20),
      rugPullRisk: Math.random(),
      lastUpdated: new Date().toISOString()
    }
    
    mockResult.riskLevel = getRiskLevel(mockResult.trustScore)
    setScanResult(mockResult)
    setIsScanning(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Address Security Scanner
          </CardTitle>
          <CardDescription>
            Scan any wallet address or token contract for security risks and fraud detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter wallet address or token contract..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button 
              onClick={handleScan} 
              disabled={!address || isScanning}
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
              <span>Scan Results</span>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskScoreColor(scanResult.trustScore)}`}>
                {scanResult.trustScore}/100
              </div>
            </CardTitle>
            <CardDescription>
              Address: {formatAddress(scanResult.address)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Risk Assessment</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Level:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskScoreColor(scanResult.trustScore)}`}>
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
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Token Metrics</h4>
                <div className="space-y-2">
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
            </div>
            
            {scanResult.trustScore < 50 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-red-800">High Risk Detected</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  This address shows multiple red flags. Exercise extreme caution before any transactions.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 