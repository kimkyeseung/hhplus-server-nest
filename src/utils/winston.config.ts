import { utilities, WinstonModule } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';
import * as moment from 'moment-timezone';
import * as path from 'path';
import { createLogger } from 'winston';

const env = process.env.NODE_ENV || 'development';

const formatTimezoneSeoul = () => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
};

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};

winston.addColors(customLevels.colors);

const dailyOptions = {
  level: 'info',
  datePattern: 'YYYY-MM-DD',
  dirname: path.join(__dirname, '../../../logs'),
  filename: `app.log.%DATE%`,
  maxFiles: 30,
  zippedArchive: true,
  handleExceptions: true,
  json: true,
};

export const winstonLogger = createLogger({
  levels: customLevels.levels,
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format:
        env === 'production'
          ? winston.format.simple()
          : winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp(),
              utilities.format.nestLike('NestJS Project', {
                prettyPrint: true,
              }),
            ),
    }),
    new winstonDaily(dailyOptions),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: formatTimezoneSeoul }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf((info) => {
      return `${info.timestamp} - [${process.pid}]: ${info.message}`;
    }),
  ),
  exceptionHandlers: [
    new winston.transports.Console(),
    new winstonDaily({
      ...dailyOptions,
      filename: `exceptions.log.%DATE%`,
    }),
  ],
});
