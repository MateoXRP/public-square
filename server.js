const express = require('express');
const path = require('path');

const app = express();

// Initialize middleware
app.use(express.json({ extended: false }));

// Routes

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));

  // All routes to build file
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set port for heroku or local
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Listening on port ${PORT}`);
});
