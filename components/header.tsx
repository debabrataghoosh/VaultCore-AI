"use client"

import { Button } from "@/components/ui/button"
import { Shield, Search, BarChart3, CreditCard, Building2, Star } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="hidden font-bold sm:inline-block">
              VaultCore
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/scan"
              className="transition-colors hover:text-foreground/80"
            >
              <Search className="h-4 w-4 mr-2 inline" />
              Universal Scanner
            </Link>
            <Link
              href="/analytics"
              className="transition-colors hover:text-foreground/80"
            >
              <BarChart3 className="h-4 w-4 mr-2 inline" />
              Analytics
            </Link>
            <Link
              href="/vaultpay"
              className="transition-colors hover:text-foreground/80"
            >
              <CreditCard className="h-4 w-4 mr-2 inline" />
              VaultPay
            </Link>
            <Link
              href="/enterprise"
              className="transition-colors hover:text-foreground/80"
            >
              <Building2 className="h-4 w-4 mr-2 inline" />
              Enterprise
            </Link>
            <Link
              href="/vaultscore"
              className="transition-colors hover:text-foreground/80"
            >
              <Star className="h-4 w-4 mr-2 inline" />
              VaultScore
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button variant="security" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 