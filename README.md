# Secondhand Malta MCP Server

A Model Context Protocol (MCP) server for interacting with secondhand.com.mt, Malta's classified ads marketplace.

## Features

- 🔍 Search listings by category, location, and keywords
- 📋 Get detailed listing information
- 🏷️ Browse categories and subcategories
- 📊 Get marketplace statistics and trends
- 🔄 Real-time data fetching with caching
- ⚡ Rate limiting and respectful scraping

## Installation

```bash
# Clone the repository
git clone https://github.com/EpicGrowth/secondhand-malta-mcp.git
cd secondhand-malta-mcp

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Build the project
npm run build

# Start the server
npm start
```

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test
```

## MCP Tools

### `search_listings`
Search for listings on secondhand.com.mt

**Parameters:**
- `query` (string): Search keywords
- `category` (string, optional): Filter by category
- `location` (string, optional): Filter by location in Malta
- `minPrice` (number, optional): Minimum price filter
- `maxPrice` (number, optional): Maximum price filter
- `limit` (number, optional): Number of results to return (default: 20)

### `get_listing_details`
Get detailed information about a specific listing

**Parameters:**
- `listingId` (string): The ID of the listing

### `get_categories`
Retrieve all available categories and subcategories

### `get_locations`
Get list of Malta locations available for filtering

### `get_marketplace_stats`
Get general statistics about the marketplace (total listings, popular categories, etc.)

## Configuration

The server can be configured through environment variables:

- `USER_AGENT`: Custom user agent for requests
- `REQUEST_DELAY_MS`: Delay between requests (default: 1000ms)
- `MAX_RETRIES`: Maximum retry attempts for failed requests
- `RATE_LIMIT_REQUESTS_PER_MINUTE`: Rate limiting (default: 30)
- `CACHE_TTL_SECONDS`: Cache time-to-live (default: 300 seconds)
- `LOG_LEVEL`: Logging level (default: info)

## Ethical Usage

This MCP server is designed to:
- Respect the website's robots.txt and terms of service
- Implement proper rate limiting
- Cache results to minimize server load
- Use appropriate delays between requests
- Provide attribution when using data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Disclaimer

This is an unofficial integration. Please ensure you comply with secondhand.com.mt's terms of service when using this tool.

## Getting Started with MCP

To use this server with Claude or other MCP-compatible tools:

1. Build and start the server
2. Configure your MCP client to connect to this server
3. Use the available tools to search and browse listings

### Example Usage

```javascript
// Search for furniture in Valletta
const results = await callTool('search_listings', {
  query: 'sofa',
  category: 'Furniture',
  location: 'Valletta',
  maxPrice: 200
});

// Get details for a specific listing
const details = await callTool('get_listing_details', {
  listingId: 'listing-123'
});

// Get all available categories
const categories = await callTool('get_categories', {});
```

## Current Limitations

- Due to robots.txt restrictions, the current implementation uses mock data
- To access real data, you would need:
  - Permission from the site owner
  - Official API access
  - Alternative data sources

## Future Enhancements

- Real web scraping implementation (with proper permissions)
- Image analysis and OCR for better listing details
- Price tracking and alerts
- Advanced filtering and sorting options
- Geolocation-based search
- Integration with other Malta marketplace sites
