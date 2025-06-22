require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const vibeRoutes = require('./routes/vibes');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/error');
const feedRoutes = require('./routes/feed');
const winston = require('winston');
const path = require('path');

const app = express();

app.use(express.json());

connectDB();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, 'logs/app.log') })
  ]
});

app.use('/api/v1/feed',feedRoutes);

app.use((req, res, next) => {
  logger.info({
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    params: req.params,
    query: req.query,
    body: req.body
  });
  next();
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vibes', vibeRoutes);
app.use('/api/v1/vibes', commentRoutes); 
app.use('/api/v1/users', userRoutes); 

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('<h1>Welcome to VibeCheck API!</h1><p>Check out our vibes at /api/v1/vibes</p>');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server blasting off on port ${PORT}`);
});
