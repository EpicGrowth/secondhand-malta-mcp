# Secondhand.com.mt - Complete Marketplace Platform

A comprehensive e-commerce platform built specifically for the Malta secondhand market, featuring a powerful Vendure backend, modern React storefront, and intelligent data aggregation capabilities.

## 🌟 Project Overview

This repository transforms from a simple MCP server into a full-featured marketplace platform that will revolutionize secondhand shopping in Malta. Built with modern technologies and designed specifically for the unique needs of Malta's classified ads market.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React/Remix   │    │  Vendure Server │    │   MCP Server    │
│   Storefront    │◄──►│   (GraphQL)     │◄──►│ (Data Aggreg.) │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        └────────────────────────┼────────────────────────┘
                                 ▼
                      ┌─────────────────┐
                      │   Database      │
                      │   (SQLite/SQL)  │
                      └─────────────────┘
```

## 📁 Project Structure

```
secondhand-malta-mcp/
├── 🔌 mcp-server/                  # Data aggregation & external integrations
│   ├── src/index.ts                # MCP server implementation
│   └── package.json                # MCP dependencies
│
├── ⚙️ vendure-server/             # E-commerce backend (Vendure)
│   ├── src/
│   │   ├── index.ts                # Server entry point
│   │   └── vendure-config.ts       # Malta-specific configuration
│   └── package.json                # Backend dependencies
│
├── 🛍️ storefront/                 # Frontend marketplace (Coming Soon)
│   ├── app/                        # React/Remix application
│   └── package.json                # Frontend dependencies
│
├── 🔧 shared/                      # Shared utilities & types
│   ├── types/                      # TypeScript definitions
│   └── constants/                  # Malta-specific constants
│
└── 📖 docs/                        # Documentation
    ├── setup.md                    # Setup instructions
    └── development.md              # Development guide
```

## ✨ Features

### 🇲🇹 Malta-Specific Features
- **Euro currency** integration
- **Malta locations** (Valletta, Sliema, St. Julian's, etc.)
- **Local categories** (Cars, Property, Electronics for Malta market)
- **Malta postal codes** and delivery areas
- **Local payment methods** (BOV, HSBC Malta)

### 🛒 Secondhand Marketplace Features
- **Item condition ratings** (New, Like New, Good, Fair, Poor)
- **Best offer system** for negotiations
- **Seller profiles** with ratings and reviews
- **Photo galleries** with multiple angles
- **Pickup locations** throughout Malta
- **Original price tracking**

### 🚀 Technical Features
- **GraphQL API** powered by Vendure
- **Real-time search** and filtering
- **Admin dashboard** for management
- **Mobile-responsive** design
- **SEO optimized** for Malta market
- **Data aggregation** from external sources via MCP

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Git

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EpicGrowth/secondhand-malta-mcp.git
   cd secondhand-malta-mcp
   ```

2. **Open in VS Code:**
   ```bash
   code secondhand-malta.code-workspace
   ```

3. **Install dependencies:**
   ```bash
   # Install MCP server dependencies
   cd mcp-server && npm install

   # Install Vendure server dependencies
   cd ../vendure-server && npm install
   ```

4. **Start development servers:**
   ```bash
   # Start Vendure server
   cd vendure-server
   npm run dev

   # Start MCP server (in another terminal)
   cd mcp-server
   npm run dev
   ```

5. **Access the applications:**
   - **Admin UI**: http://localhost:3000/admin
   - **Shop API**: http://localhost:3000/shop-api
   - **Admin API**: http://localhost:3000/admin-api

## 🛠️ Development Roadmap

### ✅ Phase 1: Foundation (Completed)
- [x] Repository restructure
- [x] Vendure server setup
- [x] Malta-specific configuration
- [x] VS Code workspace setup

### 🚧 Phase 2: Core Marketplace (In Progress)
- [ ] React/Remix storefront
- [ ] User authentication
- [ ] Product listing functionality
- [ ] Search and filtering
- [ ] Basic user profiles

### 📋 Phase 3: Malta Features (Planned)
- [ ] Malta locations integration
- [ ] Local payment methods
- [ ] Shipping/pickup options
- [ ] Malta-specific categories
- [ ] Local SEO optimization

### 🎯 Phase 4: Advanced Features (Planned)
- [ ] Best offer system
- [ ] Seller ratings
- [ ] Chat/messaging
- [ ] Mobile app (PWA)
- [ ] AI-powered recommendations

### 🔗 Phase 5: Integration (Planned)
- [ ] MCP server integration
- [ ] External data aggregation
- [ ] Price comparison
- [ ] Market analytics
- [ ] Cross-platform posting

## 🎨 Design Goals

- **🇲🇹 Local First**: Built specifically for Malta's market
- **📱 Mobile-First**: Optimized for mobile shopping
- **🔒 Trust & Safety**: Verification and rating systems
- **⚡ Performance**: Fast loading and responsive
- **🌊 Modern UI**: Clean, intuitive design
- **🔍 Discoverability**: SEO and search optimized

## 🤝 Contributing

This is an open-source project! We welcome contributions from the Malta tech community.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on [Vendure](https://vendure.io) e-commerce framework
- Inspired by the need for a modern Malta marketplace
- Powered by the Malta tech community

---

**🚀 Ready to revolutionize secondhand shopping in Malta!**

For setup instructions, see [docs/setup.md](docs/setup.md)
