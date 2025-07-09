import { bootstrap, JobQueueService, Logger } from '@vendure/core';
import { config } from './vendure-config';

// Add graceful shutdown handling
process.on('SIGINT', async () => {
  Logger.info('Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  Logger.info('Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

/**
 * Bootstrap the Vendure server for Secondhand.com.mt
 */
bootstrap(config)
  .then((app) => {
    Logger.info('Secondhand.com.mt Vendure server started successfully');
    Logger.info(`Admin UI available at: http://localhost:${config.apiOptions.port}/admin`);
    Logger.info(`Shop API available at: http://localhost:${config.apiOptions.port}/shop-api`);
    Logger.info(`Admin API available at: http://localhost:${config.apiOptions.port}/admin-api`);
  })
  .catch((err) => {
    Logger.error('Error starting Vendure server:', err);
    process.exit(1);
  });
