import winston from 'winston';

// Membuat format dasar yang bisa digunakan bersama
const baseFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }), // Menampilkan stack trace untuk error
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: baseFormat,
  transports: [
    // Transport untuk Console (development dan production)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Warna hanya untuk console
        baseFormat
      ),
      handleExceptions: true,
    }),
  ],
  exitOnError: false, // Biarkan winston menangani penutupan
});

export default logger;
