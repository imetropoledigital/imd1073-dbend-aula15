const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
  format: combine(
    format.splat(),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console({
      level: 'debug'
  }), new transports.File({
    filename: "logs/app-log.log",
    level: 'debug'
  })]
});

module.exports = logger