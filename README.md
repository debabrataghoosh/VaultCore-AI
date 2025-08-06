# VaultCore - Blockchain Security Platform

VaultCore is a comprehensive blockchain security platform that provides trust scoring, fraud detection, and security analysis for the decentralized ecosystem.

## 🌟 Features

### 🔍 Universal Blockchain Scanner
- Scan any blockchain entity: wallet addresses, crypto companies, tokens, NFTs, or projects
- Instant VaultScore analysis and comprehensive security insights
- Real-time risk assessment and fraud detection

### ⭐ VaultScore System
- Revolutionary credit score for blockchain (0-100 rating)
- Comprehensive evaluation with detailed breakdown:
  - **Security History** (25%) - Past incidents and vulnerabilities
  - **Performance Metrics** (20%) - Transaction volume and financial health
  - **Community Trust** (20%) - Social sentiment and engagement
  - **Regulatory Compliance** (15%) - Legal status and transparency
  - **Fraud Detection** (15%) - Scam indicators and suspicious patterns
  - **Technical Analysis** (5%) - Code quality and audits

### 🏢 Enterprise Solutions
- Helps large crypto-holding companies manage and secure assets
- Detects fraud in payments and generates compliance reports
- Advanced analytics and monitoring tools

### 💳 VaultPay Gateway
- Secure crypto payment system for verified transactions
- Web3 integration with fraud protection
- Ensures users and merchants are safe from scams

### 📊 Analytics Dashboard
- Comprehensive data visualization
- Real-time blockchain analytics
- Performance tracking and reporting

## 🚀 Live Demo

**Production URL:** 
https://vault-core.vercel.app/
## 🛠️ Tech Stack

- **Framework:** Next.js 15.4.5 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + Custom Components
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Blockchain:** Ethers.js + Web3.js
- **Deployment:** Vercel

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/debabrataghoosh/VaultCore-AI.git
cd vault-core
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
vault-core/
├── app/                    # Next.js App Router pages
│   ├── analytics/         # Analytics dashboard
│   ├── enterprise/        # Enterprise solutions
│   ├── scan/             # Universal scanner
│   ├── vaultpay/         # Payment gateway
│   └── vaultscore/       # VaultScore system
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── header.tsx        # Navigation header
│   └── address-scanner.tsx # Blockchain scanner
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)
The project is configured for easy deployment on Vercel:

1. **Connect your GitHub repository to Vercel**
2. **Automatic deployments** on every push to main branch
3. **Custom domain** support
4. **Environment variables** management

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_CHAIN_ID=1
```

### Vercel Configuration
The project includes `vercel.json` for optimal deployment settings.

## 📈 Performance

- **Build Time:** ~16s
- **Bundle Size:** 117kB first load
- **Static Generation:** All pages pre-rendered
- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@vaultcore.com or join our Discord community.

---

**Built with ❤️ by the VaultCore Team**
