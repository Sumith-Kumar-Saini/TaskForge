import morgan from 'morgan';
import logger from '../utils/winstonLogger.js';

const stream = {
  write: (message) => {
    logger.http(message.trim()); // Winston handles HTTP logs via 'http' level
  },
};

export function getLoggerMiddleware(env) {
  switch (env) {
    case 'development':
      return morgan('dev');
    case 'production':
      return morgan('combined', { stream });
    case 'test':
    case 'testing':
      return (req, res, next) => next();
    default:
      return morgan('dev');
  }
}
