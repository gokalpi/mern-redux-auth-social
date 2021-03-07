import winston from 'winston';

import * as config from './index.js';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: `${config.logDir}/error.log`,
      level: 'error',
    }),
    new winston.transports.File({ filename: `${config.logDir}/combined.log` }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (config.env !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

export default logger;
