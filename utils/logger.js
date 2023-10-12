import winston from 'winston';

export const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "../logs/auth-logs.log",
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

export const stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

export default logger;