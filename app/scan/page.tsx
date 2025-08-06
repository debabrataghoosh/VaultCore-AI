import { Header } from "@/components/header"
import { AddressScanner } from "@/components/address-scanner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Address Security Scanner</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scan any wallet address or token contract for security risks, fraud detection, and comprehensive blockchain analysis.
            </p>
          </div>

          <AddressScanner />

          {/* Recent Scans */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Recent Scans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
                  score: 85,
                  status: "Safe",
                  time: "2 minutes ago"
                },
                {
                  address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
                  score: 45,
                  status: "Medium Risk",
                  time: "5 minutes ago"
                },
                {
                  address: "0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8",
                  score: 15,
                  status: "High Risk",
                  time: "10 minutes ago"
                }
              ].map((scan, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {scan.score >= 70 ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : scan.score >= 40 ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        <span className="font-medium">{scan.status}</span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        scan.score >= 70 ? 'bg-green-100 text-green-800' :
                        scan.score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {scan.score}/100
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{scan.address}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {scan.time}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Why Choose VaultCore Scanner?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Real-time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Get instant security assessments using our advanced blockchain analysis engine.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Comprehensive Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Detailed risk analysis including contract verification, liquidity status, and transaction patterns.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Fraud Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced algorithms detect rug pulls, pump-and-dump schemes, and other scams.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 