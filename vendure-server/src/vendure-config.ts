import {
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
  LanguageCode,
  CurrencyCode,
  DefaultLogger,
  LogLevel,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Vendure configuration for Secondhand.com.mt
 * Customized for Malta marketplace with Euro currency and local settings
 */
export const config: VendureConfig = {
  apiOptions: {
    port: parseInt(process.env.PORT || '3000'),
    adminApiPath: 'admin-api',
    shopApiPath: 'shop-api',
    // CORS configuration for Malta domains
    cors: {
      origin: IS_PROD ? [
        'https://secondhand.com.mt',
        'https://www.secondhand.com.mt',
        'https://admin.secondhand.com.mt'
      ] : true,
      credentials: true,
    },
  },

  // Database configuration
  dbConnectionOptions: {
    type: 'sqlite',
    database: path.join(__dirname, '../vendure.sqlite'),
    synchronize: IS_DEV,
    logging: IS_DEV,
    migrations: [path.join(__dirname, '../migrations/*.ts')],
  },

  // Malta-specific configuration
  defaultChannelToken: null,
  defaultLanguageCode: LanguageCode.en,
  defaultCurrencyCode: CurrencyCode.EUR, // Euro for Malta
  
  // Custom fields for secondhand marketplace
  customFields: {
    Product: [
      {
        name: 'condition',
        type: 'string',
        options: [
          { value: 'new', label: [{ languageCode: LanguageCode.en, value: 'New' }] },
          { value: 'like_new', label: [{ languageCode: LanguageCode.en, value: 'Like New' }] },
          { value: 'good', label: [{ languageCode: LanguageCode.en, value: 'Good' }] },
          { value: 'fair', label: [{ languageCode: LanguageCode.en, value: 'Fair' }] },
          { value: 'poor', label: [{ languageCode: LanguageCode.en, value: 'Poor' }] },
        ],
        defaultValue: 'good',
      },
      {
        name: 'yearPurchased',
        type: 'int',
        label: [{ languageCode: LanguageCode.en, value: 'Year Purchased' }],
      },
      {
        name: 'originalPrice',
        type: 'int',
        label: [{ languageCode: LanguageCode.en, value: 'Original Price (€)' }],
      },
      {
        name: 'acceptOffers',
        type: 'boolean',
        label: [{ languageCode: LanguageCode.en, value: 'Accept Best Offers' }],
        defaultValue: true,
      },
      {
        name: 'pickupLocation',
        type: 'string',
        options: [
          { value: 'valletta', label: [{ languageCode: LanguageCode.en, value: 'Valletta' }] },
          { value: 'sliema', label: [{ languageCode: LanguageCode.en, value: 'Sliema' }] },
          { value: 'st_julians', label: [{ languageCode: LanguageCode.en, value: "St. Julian's" }] },
          { value: 'birkirkara', label: [{ languageCode: LanguageCode.en, value: 'Birkirkara' }] },
          { value: 'mosta', label: [{ languageCode: LanguageCode.en, value: 'Mosta' }] },
          { value: 'qormi', label: [{ languageCode: LanguageCode.en, value: 'Qormi' }] },
          { value: 'zabbar', label: [{ languageCode: LanguageCode.en, value: 'Zabbar' }] },
          { value: 'hamrun', label: [{ languageCode: LanguageCode.en, value: 'Hamrun' }] },
          { value: 'naxxar', label: [{ languageCode: LanguageCode.en, value: 'Naxxar' }] },
          { value: 'fgura', label: [{ languageCode: LanguageCode.en, value: 'Fgura' }] },
          { value: 'luqa', label: [{ languageCode: LanguageCode.en, value: 'Luqa' }] },
          { value: 'marsa', label: [{ languageCode: LanguageCode.en, value: 'Marsa' }] },
          { value: 'paola', label: [{ languageCode: LanguageCode.en, value: 'Paola' }] },
          { value: 'tarxien', label: [{ languageCode: LanguageCode.en, value: 'Tarxien' }] },
          { value: 'pieta', label: [{ languageCode: LanguageCode.en, value: 'Pietà' }] },
          { value: 'msida', label: [{ languageCode: LanguageCode.en, value: 'Msida' }] },
          { value: 'gzira', label: [{ languageCode: LanguageCode.en, value: 'Gzira' }] },
          { value: 'san_gwann', label: [{ languageCode: LanguageCode.en, value: 'San Gwann' }] },
          { value: 'santa_venera', label: [{ languageCode: LanguageCode.en, value: 'Santa Venera' }] },
          { value: 'pembroke', label: [{ languageCode: LanguageCode.en, value: 'Pembroke' }] },
          { value: 'gozo', label: [{ languageCode: LanguageCode.en, value: 'Gozo' }] },
          { value: 'comino', label: [{ languageCode: LanguageCode.en, value: 'Comino' }] },
        ],
      },
    ],
    Customer: [
      {
        name: 'phoneNumber',
        type: 'string',
        label: [{ languageCode: LanguageCode.en, value: 'Phone Number' }],
      },
      {
        name: 'rating',
        type: 'float',
        label: [{ languageCode: LanguageCode.en, value: 'Seller Rating' }],
        defaultValue: 0,
      },
      {
        name: 'totalSales',
        type: 'int',
        label: [{ languageCode: LanguageCode.en, value: 'Total Sales' }],
        defaultValue: 0,
      },
    ],
    Order: [
      {
        name: 'deliveryMethod',
        type: 'string',
        options: [
          { value: 'pickup', label: [{ languageCode: LanguageCode.en, value: 'Pickup' }] },
          { value: 'malta_post', label: [{ languageCode: LanguageCode.en, value: 'Malta Post' }] },
          { value: 'delivery', label: [{ languageCode: LanguageCode.en, value: 'Local Delivery' }] },
        ],
        defaultValue: 'pickup',
      },
    ],
  },

  // Plugins configuration
  plugins: [
    // Asset handling for product images
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
      // Allow common image formats for secondhand items
      permittedFileTypes: ['image/*', 'video/*'],
      maxFileSize: 10 * 1024 * 1024, // 10MB
    }),

    // Default search functionality
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),

    // Job queue for background tasks
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: false }),

    // Email functionality for marketplace communications
    EmailPlugin.init({
      route: 'mailbox',
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, '../static/email/templates'),
      outputPath: path.join(__dirname, '../static/email/output'),
      globalTemplateVars: {
        fromAddress: '\"Secondhand Malta\" <noreply@secondhand.com.mt>',
        verifyEmailAddressUrl: 'https://secondhand.com.mt/verify',
        passwordResetUrl: 'https://secondhand.com.mt/password-reset',
        changeEmailAddressUrl: 'https://secondhand.com.mt/verify-email-address-change',
      },
    }),

    // Admin UI configuration
    AdminUiPlugin.init({
      route: 'admin',
      port: parseInt(process.env.ADMIN_PORT || '3002'),
      adminUiConfig: {
        brand: 'Secondhand Malta',
        hideVendureBranding: false,
        hideVersion: false,
      },
    }),
  ],

  // Payment methods (will be configured for Malta-specific options)
  paymentOptions: {
    paymentMethodHandlers: [
      // TODO: Add Malta-specific payment methods
      // - BOV (Bank of Valletta)
      // - HSBC Malta
      // - Cash on delivery/pickup
    ],
  },

  // Shipping methods for Malta
  shippingOptions: {
    shippingCalculators: [
      // TODO: Add Malta-specific shipping
      // - Malta Post
      // - Local delivery
      // - Pickup locations
    ],
  },

  // Logging configuration
  logger: new DefaultLogger({ level: IS_DEV ? LogLevel.Debug : LogLevel.Info }),

  // Worker configuration for background jobs
  workerOptions: {
    runInMainProcess: IS_DEV,
  },

  // Import/export settings
  importExportOptions: {
    importAssetsDir: path.join(__dirname, '../static/import-assets'),
  },
};
