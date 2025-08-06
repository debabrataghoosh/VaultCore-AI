import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AddressScanner } from "@/components/address-scanner"
import { Star, Shield, TrendingUp, AlertTriangle, CheckCircle, XCircle, Info, BarChart3, Zap, Users, Globe, Lock, Coins, Building2, Search } from "lucide-react"

export default function VaultScorePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Star className="h-16 w-16 text-yellow-300" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              VaultScore
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              The Revolutionary Credit Score for Blockchain
            </p>
            <p className="text-lg mb-12 text-yellow-200 max-w-3xl mx-auto">
              VaultScore evaluates any crypto entity - from addresses to companies - 
              and provides a comprehensive trustworthiness rating from 0-100. 
              Make informed decisions with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="security" className="text-lg px-8 py-4">
                <Search className="mr-2 h-5 w-5" />
                Check VaultScore
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-orange-600">
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* VaultScore Scanner */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Check Any Entity's VaultScore</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enter any blockchain address, company name, or token symbol to get an instant VaultScore analysis.
            </p>
          </div>
          <AddressScanner />
        </div>
      </section>

      {/* Score Breakdown */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Understanding VaultScore</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              VaultScore is calculated using advanced algorithms that analyze multiple factors 
              to provide a comprehensive trustworthiness rating.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-2 border-green-200 bg-green-50">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">80-100</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-green-700">
                  <strong>Excellent</strong> - Highly trustworthy with minimal risk
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-800">60-79</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-yellow-700">
                  <strong>Good</strong> - Generally safe with some considerations
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">40-59</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-orange-700">
                  <strong>Fair</strong> - Exercise caution and do thorough research
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-red-200 bg-red-50">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">0-39</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-red-700">
                  <strong>Poor</strong> - High risk, avoid or extreme caution
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scoring Factors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How VaultScore is Calculated</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced algorithm analyzes multiple factors to provide a comprehensive 
              and accurate trustworthiness rating.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Security History</CardTitle>
                    <CardDescription>25% of total score</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Analysis of past security incidents, hacks, and vulnerabilities. 
                  Tracks reputation over time and assesses risk patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>20% of total score</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Transaction volume, liquidity, market cap stability, and 
                  overall financial health indicators.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Community Trust</CardTitle>
                    <CardDescription>20% of total score</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Social media sentiment, community engagement, developer activity, 
                  and user feedback analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Regulatory Compliance</CardTitle>
                    <CardDescription>15% of total score</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Legal status, regulatory filings, compliance with local laws, 
                  and transparency in operations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Lock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>Fraud Detection</CardTitle>
                    <CardDescription>15% of total score</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Detection of suspicious patterns, scam indicators, fake tokens, 
                  and malicious contract analysis.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle>Technical Analysis</CardTitle>
                    <CardDescription>5% of total score</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Code quality, smart contract audits, technical implementation, 
                  and blockchain integration quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Scores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Example VaultScores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how different types of blockchain entities are evaluated by our system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Coins className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Bitcoin (BTC)</CardTitle>
                      <CardDescription>Cryptocurrency</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">95</div>
                    <div className="text-xs text-green-600">Excellent</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Established cryptocurrency with strong security, high liquidity, 
                  and widespread adoption. Excellent community trust and regulatory clarity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">New DeFi Protocol</CardTitle>
                      <CardDescription>DeFi Platform</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-600">68</div>
                    <div className="text-xs text-yellow-600">Good</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Promising new protocol with good technical implementation but 
                  limited track record. Requires ongoing monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Meme Token</CardTitle>
                      <CardDescription>Token</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">45</div>
                    <div className="text-xs text-orange-600">Fair</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  High volatility token with limited utility. Moderate community 
                  engagement but significant risk factors present.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Suspicious Address</CardTitle>
                      <CardDescription>Wallet Address</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">12</div>
                    <div className="text-xs text-red-600">Poor</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Address linked to multiple scam reports and suspicious transaction 
                  patterns. High risk of fraud or malicious activity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Ethereum (ETH)</CardTitle>
                      <CardDescription>Cryptocurrency</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">92</div>
                    <div className="text-xs text-green-600">Excellent</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Well-established blockchain with strong developer community, 
                  extensive ecosystem, and proven security track record.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">Crypto Exchange</CardTitle>
                      <CardDescription>Platform</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-600">75</div>
                    <div className="text-xs text-yellow-600">Good</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Established exchange with good security measures but regulatory 
                  challenges. Generally reliable with some compliance concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Use VaultScore?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Make informed decisions with confidence using our comprehensive blockchain trust scoring system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
              <p className="text-blue-100">
                Get instant risk analysis for any blockchain entity. Identify potential 
                scams, fraud, and security issues before they affect your investments.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data-Driven Decisions</h3>
              <p className="text-blue-100">
                Make investment decisions based on comprehensive data analysis rather 
                than speculation. Our algorithm considers multiple factors for accuracy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-blue-100">
                VaultScores are updated in real-time as new information becomes available. 
                Stay current with the latest security and performance data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Check VaultScores?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start using VaultScore today to make safer, more informed blockchain investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="security" className="text-lg px-8 py-4">
              <Search className="mr-2 h-5 w-5" />
              Check VaultScore Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 