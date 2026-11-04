import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './api/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

// Serve Vite production build static assets if exists
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// For client-side routing fallback (SPA)
app.use((req, res, next) => {
    // If request is for /api/*, pass to next handler (e.g. 404)
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
    }
    const indexPath = path.join(distPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(200).send('CyberShield Mission API Server is running. Run `npm run build` to compile frontend.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`[CyberShield] Server running on port ${PORT} (http://localhost:${PORT})`);
});
