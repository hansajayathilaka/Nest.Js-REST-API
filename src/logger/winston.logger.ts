import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export class WinstonLogger {
    dailyRotateFileTransport: any = null;
    formatter: winston.Logform.Format = null;
    jsonFormat = process.env.LOG_JSON || false;
    fileLog = process.env.LOG_FILE || false;
    createLoggerConfig: winston.LoggerOptions = null;

    constructor() {
        this.dailyRotateFileTransport = new DailyRotateFile({
            filename: `logs/app_log-%DATE%.log`,
            zippedArchive: false,
            maxSize: '20m',
            maxFiles: '1d',
        });

        this.formatter = winston.format.printf(
            ({ level = 'info', message, timestamp, req, err, ...metadata }) => {
                if (!req) {
                    req = { headers: {} };
                }

                let msg = `${timestamp} [${level}] : ${message} `;
                if (this.jsonFormat) {
                    const json: any = {
                        timestamp,
                        level,
                        ...metadata,
                        message,
                        error: {},
                    };

                    if (err) {
                        json.error = err.stack || err;
                    }

                    msg = JSON.stringify(json);
                    return msg;
                } else {
                    if (err) {
                        msg += `Error: ${err.stack || err}`;
                    }
                    return msg;
                }
            },
        );

        const logTransports = [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.cli(),
                    winston.format.splat(),
                    winston.format.timestamp(),
                    winston.format.printf((info) => {
                        return `${info.timestamp} ${info.level}: ${info.message}`;
                    }),
                ),
            }),
        ];
        if (this.fileLog) {
            logTransports.push(this.dailyRotateFileTransport);
        }

        this.createLoggerConfig = {
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.splat(),
                winston.format.errors({ stack: true }),
                winston.format.json(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                this.formatter,
            ),

            transports: logTransports,
        };
    }
}
