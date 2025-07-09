# Secondhand.com.mt - Project Structure

This repository contains the complete Secondhand.com.mt marketplace platform, built using Vendure e-commerce engine with Malta-specific customizations.

## Repository Structure

```
secondhand-malta-mcp/
├── mcp-server/                     # Original MCP server (for data aggregation)
│   ├── src/index.ts                # MCP server implementation
│   ├── package.json                # MCP dependencies
│   └── README.md                   # MCP documentation
│
├── vendure-server/                 # E-commerce backend (Vendure)
│   ├── src/                        # Vendure server source
│   ├── static/                     # Static assets & email templates
│   ├── Dockerfile                  # Container configuration
│   └── package.json                # Backend dependencies
│
├── storefront/                     # Frontend marketplace (Remix/React)
│   ├── app/                        # Remix application code
│   ├── public/                     # Public assets
│   ├── Dockerfile                  # Container configuration
│   └── package.json                # Frontend dependencies
│
├── shared/                         # Shared utilities and types
│   ├── types/                      # TypeScript type definitions
│   ├── constants/                  # Malta-specific constants
│   └── utils/                      # Shared utility functions
│
├── deployment/                     # Deployment configurations
│   ├── docker-compose.yml          # Local development
│   ├── cloudrun/                   # Google Cloud Run configs
│   └── scripts/                    # Deployment scripts
│
├── docs/                           # Documentation
│   ├── setup.md                    # Setup instructions
│   ├── development.md              # Development guide
│   └── deployment.md               # Deployment guide
│
├── .github/                        # GitHub workflows
│   └── workflows/                  # CI/CD automation
│
└── README.md                       # Main project documentation
```

## Technology Stack

- **Backend**: Vendure (Node.js + GraphQL + TypeScript)
- **Frontend**: Remix (React + TypeScript + Tailwind CSS)
- **Database**: MySQL/PostgreSQL
- **File Storage**: Local/Cloud Storage
- **Authentication**: Vendure built-in auth
- **Deployment**: Docker + Cloud Run
- **MCP**: Custom data aggregation server

## Development Phases

### Phase 1: Foundation Setup
- [x] Repository restructure
- [ ] Vendure server setup
- [ ] Basic storefront setup
- [ ] Local development environment

### Phase 2: Malta Customization
- [ ] Malta locations integration
- [ ] Local categories (Cars, Property, Electronics)
- [ ] Euro currency setup
- [ ] Malta-specific shipping/pickup

### Phase 3: Secondhand Features
- [ ] Item condition ratings
- [ ] Seller profiles & ratings
- [ ] Negotiation system
- [ ] Photo galleries
- [ ] Search & filters

### Phase 4: Advanced Features
- [ ] MCP integration for data aggregation
- [ ] AI-powered categorization
- [ ] Price suggestions
- [ ] Mobile optimization
- [ ] Production deployment

## Getting Started

See [docs/setup.md](docs/setup.md) for detailed setup instructions.
