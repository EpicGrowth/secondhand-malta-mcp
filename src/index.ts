#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
  TextContent,
  ImageContent,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration
const CONFIG = {
  USER_AGENT: process.env.USER_AGENT || 'secondhand-malta-mcp/1.0.0',
  REQUEST_DELAY_MS: parseInt(process.env.REQUEST_DELAY_MS || '1000'),
  MAX_RETRIES: parseInt(process.env.MAX_RETRIES || '3'),
  RATE_LIMIT_RPM: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '30'),
  CACHE_TTL_SECONDS: parseInt(process.env.CACHE_TTL_SECONDS || '300'),
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

// Types
interface Listing {
  id: string;
  title: string;
  price?: string;
  location?: string;
  category?: string;
  description?: string;
  images?: string[];
  datePosted?: string;
  contactInfo?: string;
  url: string;
}

interface SearchParams {
  query?: string;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}

// Cache implementation
class SimpleCache {
  private cache = new Map<string, { data: any; expiry: number }>();

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key: string, data: any, ttlSeconds: number = CONFIG.CACHE_TTL_SECONDS): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + (ttlSeconds * 1000)
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Rate limiter
class RateLimiter {
  private requests: number[] = [];
  
  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const minute = 60 * 1000;
    
    // Remove requests older than 1 minute
    this.requests = this.requests.filter(time => now - time < minute);
    
    if (this.requests.length >= CONFIG.RATE_LIMIT_RPM) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = minute - (now - oldestRequest);
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    this.requests.push(now);
  }
}

// Scraper class
class SecondhandMaltaScraper {
  private cache = new SimpleCache();
  private rateLimiter = new RateLimiter();
  private baseUrl = 'http://www.secondhand.com.mt';

  private async makeRequest(url: string, retryCount = 0): Promise<string> {
    await this.rateLimiter.waitIfNeeded();
    
    try {
      await new Promise(resolve => setTimeout(resolve, CONFIG.REQUEST_DELAY_MS));
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': CONFIG.USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
        },
        timeout: 10000,
      });
      
      return response.data;
    } catch (error) {
      if (retryCount < CONFIG.MAX_RETRIES) {
        console.log(`Request failed, retrying... (${retryCount + 1}/${CONFIG.MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1)));
        return this.makeRequest(url, retryCount + 1);
      }
      throw error;
    }
  }

  async searchListings(params: SearchParams): Promise<Listing[]> {
    const cacheKey = `search:${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      // Since we can't access the site directly due to robots.txt,
      // we'll return mock data that represents the structure
      // In a real implementation, you'd need to work with the site owner
      // or use their official API if available
      
      const mockListings: Listing[] = [
        {
          id: 'mock-1',
          title: 'Sample Furniture Item',
          price: '€150',
          location: 'Valletta',
          category: 'Furniture',
          description: 'This is a sample listing - actual implementation would scrape real data',
          images: [],
          datePosted: new Date().toISOString(),
          url: `${this.baseUrl}/listing/mock-1`
        },
        {
          id: 'mock-2',
          title: 'Electronics Item',
          price: '€75',
          location: 'Sliema',
          category: 'Electronics',
          description: 'Another sample listing for demonstration',
          images: [],
          datePosted: new Date().toISOString(),
          url: `${this.baseUrl}/listing/mock-2`
        }
      ];

      // Filter based on params
      let filtered = mockListings;
      
      if (params.query) {
        filtered = filtered.filter(listing => 
          listing.title.toLowerCase().includes(params.query!.toLowerCase()) ||
          listing.description?.toLowerCase().includes(params.query!.toLowerCase())
        );
      }
      
      if (params.category) {
        filtered = filtered.filter(listing => 
          listing.category?.toLowerCase() === params.category!.toLowerCase()
        );
      }
      
      if (params.location) {
        filtered = filtered.filter(listing => 
          listing.location?.toLowerCase().includes(params.location!.toLowerCase())
        );
      }
      
      if (params.limit) {
        filtered = filtered.slice(0, params.limit);
      }

      this.cache.set(cacheKey, filtered);
      return filtered;
      
    } catch (error) {
      console.error('Error searching listings:', error);
      throw new Error(`Failed to search listings: ${error}`);
    }
  }

  async getListingDetails(listingId: string): Promise<Listing | null> {
    const cacheKey = `listing:${listingId}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    try {
      // Mock implementation
      const mockListing: Listing = {
        id: listingId,
        title: `Detailed view of listing ${listingId}`,
        price: '€100',
        location: 'Malta',
        category: 'General',
        description: 'Detailed description would be scraped from the actual page',
        images: [],
        datePosted: new Date().toISOString(),
        contactInfo: 'Contact information would be extracted here',
        url: `${this.baseUrl}/listing/${listingId}`
      };

      this.cache.set(cacheKey, mockListing);
      return mockListing;
      
    } catch (error) {
      console.error('Error fetching listing details:', error);
      return null;
    }
  }

  async getCategories(): Promise<string[]> {
    const cacheKey = 'categories';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    // Mock categories based on typical classified ad sites
    const categories = [
      'Vehicles',
      'Property',
      'Electronics',
      'Furniture',
      'Clothing',
      'Sports & Leisure',
      'Books & Media',
      'Baby & Kids',
      'Pets',
      'Services',
      'Jobs',
      'Other'
    ];

    this.cache.set(cacheKey, categories);
    return categories;
  }

  async getLocations(): Promise<string[]> {
    const cacheKey = 'locations';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    // Malta locations
    const locations = [
      'Valletta',
      'Sliema',
      'St. Julian\'s',
      'Birkirkara',
      'Mosta',
      'Qormi',
      'Zabbar',
      'Hamrun',
      'Naxxar',
      'Fgura',
      'Luqa',
      'Marsa',
      'Paola',
      'Tarxien',
      'Pietà',
      'Msida',
      'Gzira',
      'San Gwann',
      'Santa Venera',
      'Pembroke',
      'Gozo',
      'Comino'
    ];

    this.cache.set(cacheKey, locations);
    return locations;
  }
}

// Initialize scraper
const scraper = new SecondhandMaltaScraper();

// Define tools
const tools: Tool[] = [
  {
    name: 'search_listings',
    description: 'Search for listings on secondhand.com.mt',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search keywords'
        },
        category: {
          type: 'string',
          description: 'Filter by category'
        },
        location: {
          type: 'string',
          description: 'Filter by location in Malta'
        },
        minPrice: {
          type: 'number',
          description: 'Minimum price filter'
        },
        maxPrice: {
          type: 'number',
          description: 'Maximum price filter'
        },
        limit: {
          type: 'number',
          description: 'Number of results to return (default: 20)',
          default: 20
        }
      }
    }
  },
  {
    name: 'get_listing_details',
    description: 'Get detailed information about a specific listing',
    inputSchema: {
      type: 'object',
      properties: {
        listingId: {
          type: 'string',
          description: 'The ID of the listing'
        }
      },
      required: ['listingId']
    }
  },
  {
    name: 'get_categories',
    description: 'Retrieve all available categories',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_locations',
    description: 'Get list of Malta locations available for filtering',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

// Create MCP server
const server = new Server(
  {
    name: 'secondhand-malta-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'search_listings': {
        const params = args as SearchParams;
        const listings = await scraper.searchListings(params);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(listings, null, 2)
            } as TextContent
          ]
        };
      }

      case 'get_listing_details': {
        const { listingId } = args as { listingId: string };
        const listing = await scraper.getListingDetails(listingId);
        
        if (!listing) {
          return {
            content: [
              {
                type: 'text',
                text: 'Listing not found'
              } as TextContent
            ],
            isError: true
          };
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(listing, null, 2)
            } as TextContent
          ]
        };
      }

      case 'get_categories': {
        const categories = await scraper.getCategories();
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(categories, null, 2)
            } as TextContent
          ]
        };
      }

      case 'get_locations': {
        const locations = await scraper.getLocations();
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(locations, null, 2)
            } as TextContent
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing ${name}: ${error}`
        } as TextContent
      ],
      isError: true
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Secondhand Malta MCP server running on stdio');
}

main().catch(console.error);
