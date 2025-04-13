
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3001;

// Serve static files from the 'public' folder using the absolute path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Ensure the correct file path
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
