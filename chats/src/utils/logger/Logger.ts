import {createLogger, format, transports} from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            "format": format.combine(
              format.colorize(),
              format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
          })
    ],
    defaultMeta: { service: 'chats' }
});