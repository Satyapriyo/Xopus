


# 🧠 AI Crypto Sidekick

> Real-time insights. Pay-per-query. Built onchain.

AI Crypto Sidekick is a decentralized AI agent platform that delivers real-time crypto insights via pay-per-query monetization. Powered by **x402**, **CDP Wallet**, and **AgentKit**, it empowers developers to earn revenue from every API call.

![Hero Banner](https://your-banner-image-url.com) <!-- optional: Add a screenshot or demo gif -->

---

### 🚀 Features

* ⚡ **Real-time Crypto Insights** – Live token prices, analytics, and predictions
* 🔐 **Pay-Per-Query API** – Monetized fetch using `x402-fetch` + `CDP Wallet`
* 🤖 **AI Agent Interface** – Ask questions, get intelligent responses
* 🧾 **Transparent Onchain Accounting** – Revenue split between devs, providers, and treasury
* 🌙 **Dark Mode Friendly** – Fully responsive and theme-aware UI

---

### 🧰 Tech Stack

| Layer       | Tech                                     |
| ----------- | ---------------------------------------- |
| Frontend    | Next.js 15 + TailwindCSS + Shadcn/ui     |
| Agent Infra | [AgentKit](https://agentkit.xyz)         |
| Payments    | [x402pay](https://x402.app) + CDP Wallet |
| Blockchain  | Ethereum (or other EVM chains)           |
| Deployment  | Vercel / Netlify (recommended)           |

---

### 📦 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/ai-crypto-sidekick.git
cd ai-crypto-sidekick

# Install dependencies
npm install

# Run the dev server
npm run dev
```

---

### 🔌 Environment Variables

Create a `.env.local` file and configure:

```env
NEXT_PUBLIC_X402_PROJECT_ID=your-x402pay-project-id
NEXT_PUBLIC_AGENT_API_URL=https://your-agent-api.com
NEXT_PUBLIC_CHAIN_ID=1 # Ethereum Mainnet (or testnet)
```

---

### 💰 How Pay-Per-Query Works

1. User submits a question via the UI.
2. The app wraps a fetch call with `x402-fetch`, which triggers CDP Wallet for payment.
3. Payment is split:

   * 70% to developer
   * 20% to data provider
   * 10% to community treasury

You get paid every time your API is queried.

---

### 🧪 Example Queries

* `"What's the current ETH gas fee?"`
* `"List top gainers on Pump.fun"`
* `"Should I buy SOL now?"`

---

### 📸 Screenshots

| Light Mode                                  | Dark Mode                                 |
| ------------------------------------------- | ----------------------------------------- |
| ![light](https://your-light-mode-image.png) | ![dark](https://your-dark-mode-image.png) |

---

### 📄 License

MIT © [Satyapriyo](https://yourwebsite.com)

---

### ✨ Credits

* Built with ❤️ using [AgentKit](https://agentkit.xyz), [x402](https://x402.app), [CDP Wallet](https://cdpwallet.com)
* Design inspired by Web3-native interfaces


