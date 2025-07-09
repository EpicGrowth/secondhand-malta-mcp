# MCP Server for Data Aggregation

This directory contains the original Model Context Protocol (MCP) server that was created for secondhand.com.mt integration. 

## Purpose

While we're building the full e-commerce platform, this MCP server will still be useful for:

- **Data aggregation** from external sources
- **Price comparison** across multiple platforms
- **Market analysis** and trend detection
- **Content syndication** to other platforms

## Structure

```
mcp-server/
├── src/
│   └── index.ts              # Main MCP server implementation
├── package.json              # MCP-specific dependencies
├── tsconfig.json             # TypeScript configuration
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Integration with Main Platform

The MCP server will integrate with our Vendure backend to provide enhanced marketplace intelligence and data aggregation capabilities.

## Usage

```bash
cd mcp-server
npm install
npm run build
npm start
```

See the main project documentation for how this integrates with the full marketplace platform.
