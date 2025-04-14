import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
// Serve static files from the project root and src/public (if exists)
app.use(express.static(path.resolve(__dirname, '../public')));
// Serve index.html for all unmatched routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
