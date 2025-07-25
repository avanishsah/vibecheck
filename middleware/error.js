const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.File({ filename: 'logs/app.log' })
  ]
});

const errorHandler = (err, req, res, next) => {
  logger.error({
    timestamp: new Date(),
    method: req.method,
    url: req.url,
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack
    },
    params: req.params,
    query: req.query
  });

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID',
      message: `The value '${err.value}' is not a valid ID format`
    });
  }

  res.status(500).json({
    success: false,
    error: 'Server Error'
  });
};

module.exports = errorHandler;