//Import Express
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const vibeRoutes = require('./routes/vibes');

//Create Express app
const app = express();

// Init Middleware
app.use(express.json());

// Connect Database
connectDB();

// Define Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vibes', vibeRoutes);

// Sample data - our temporary "database"
const sampleVibes = [
  {
    id: 1,
    mood: 'Excited',
    message: 'Learning Node.js and Express!',
    author: 'Avanish Kumar',
    date: '2023-05-15'
  },
  {
    id: 2,
    mood: 'Chill',
    message: 'Enjoying while coding.',
    author: 'Sai Kiran Polaki',
    date: '2023-05-16'
  },
  {
    id: 3,
    mood: 'Focused',
    message: 'Debugging for 3 hours but finally found the issue!',
    author: 'Shivam Pandey',
    date: '2023-05-17'
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('<h1>Welcome to VibeCheck API!</h1><p>Check out our vibes at /api/v1/vibes</p>');
});

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('<h1>Welcome to VibeCheck API!</h1><p>Check out our vibes at /api/v1/vibes</p>');
})

//Get all vibes
app.get('/api/v1/vibes', (req, res) => {
    res.json(sampleVibes);
})

//Get one by id
app.get('/api/v1/vibes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const vibe = sampleVibes.find(v => v.id === id);

    if(vibe){
        res.json(vibe);
    }else{
        res.status(404).json({
            success: false,
            message: "That vibe is off the grid, not found."
        });
    }
})

const PORT = process.env.PORT || 5000;

//SERVER
app.listen(PORT, () => {
    console.log(`🚀 Server blasting off on port ${PORT}`);
});
