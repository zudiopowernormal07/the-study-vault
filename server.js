import app from './api/index.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve compiled static files in production (for local execution)
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Route wildcard fallback for Client Side Routing (React SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start local server
app.listen(PORT, () => {
  console.log(`Node.js/Express server running locally on http://localhost:${PORT}`);
});
