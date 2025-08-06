import { Header } from "@/components/header"
import { AddressScanner } from "@/components/address-scanner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, BarChart3, CreditCard, Building2, Zap, Users, Globe, Lock, Star, Coins, Image as ImageIcon } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              VaultCore
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Blockchain is transparent, but trust is missing.
            </p>
            <p className="text-lg mb-12 text-blue-200 max-w-3xl mx-auto">
              VaultCore acts as a security layer for the decentralized world by detecting scams, 
              evaluating project safety, and helping investors make informed decisions with our revolutionary VaultScore system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="security" className="text-lg px-8 py-4">
                <Search className="mr-2 h-5 w-5" />
                Scan Any Entity
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-900">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* VaultScore Introduction */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Star className="h-12 w-12 text-yellow-500" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Introducing VaultScore</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The revolutionary credit score for blockchain. VaultScore evaluates any crypto entity - from addresses to companies - 
              and provides a comprehensive trustworthiness rating from 0-100.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center border-2 border-green-200 bg-green-50">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
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
                  <Star className="h-6 w-6 text-yellow-600" />
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
                  <Star className="h-6 w-6 text-orange-600" />
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
                  <Star className="h-6 w-6 text-red-600" />
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

      {/* Universal Scanner Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Universal Blockchain Scanner</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scan any blockchain entity - wallet addresses, crypto companies, tokens, NFTs, or projects. 
              Get instant VaultScore analysis and comprehensive security insights.
            </p>
          </div>
          <AddressScanner />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Key Features & Offerings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive blockchain security and fraud detection tools for the decentralized ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Universal Scanning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Scan any blockchain entity: addresses, companies, tokens, NFTs, or projects. 
                  Get instant VaultScore analysis and risk assessment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>VaultScore System</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Revolutionary credit score for blockchain. Comprehensive evaluation from 0-100 
                  with detailed breakdown of trust, security, and performance metrics.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Enterprise Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Helps large crypto-holding companies manage, track, and secure their assets. 
                  Detects fraud in payments and generates compliance reports.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>VaultPay Gateway</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Secure crypto payment system for verified transactions. Ensures users and 
                  merchants are safe from fraud with Web3 integration.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10M+</div>
              <div className="text-blue-100">Entities Scanned</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$2B+</div>
              <div className="text-blue-100">Fraud Prevented</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Secure Your Crypto?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of investors and enterprises who trust VaultCore for their blockchain security needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="security" className="text-lg px-8 py-4">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-xl">VaultCore</span>
              </div>
              <p className="text-gray-400">
                Bringing trust and transparency to blockchain investments.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/scan" className="hover:text-white">Universal Scanner</Link></li>
                <li><Link href="/analytics" className="hover:text-white">Analytics</Link></li>
                <li><Link href="/vaultpay" className="hover:text-white">VaultPay</Link></li>
                <li><Link href="/enterprise" className="hover:text-white">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white">Press</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-white">API</Link></li>
                <li><Link href="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VaultCore Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
