// Simple Express backend for versioning and sharing using NeDB

import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import Datastore from 'nedb';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

// ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup NeDB
const db = new Datastore({ filename: path.join(__dirname, 'versions.db'), autoload: true });

app.use(cors());
app.use(express.json());

// POST /api/versions - Save a new version
app.post('/api/versions', (req, res) => {
  const { name, description, data, userId } = req.body;
  const id = uuidv4();
  const timestamp = new Date().toISOString();
  const version = { id, name, description, data, userId, timestamp };
  db.insert(version, (err, newDoc) => {
    if (err) return res.status(500).json({ error: 'Failed to save version' });
    res.json({ id: newDoc.id });
  });
});

// GET /api/versions/:id - Retrieve a version by ID
app.get('/api/versions/:id', (req, res) => {
  db.findOne({ id: req.params.id }, (err, doc) => {
    if (err || !doc) return res.status(404).json({ error: 'Version not found' });
    res.json(doc);
  });
});

// GET /api/versions - List all versions (optionally by user)
app.get('/api/versions', (req, res) => {
  const { user } = req.query;
  const query = user ? { userId: user } : {};
  db.find(query).sort({ timestamp: -1 }).exec((err, docs) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch versions' });
    // Return metadata only
    const versions = docs.map(({ id, name, description, timestamp, userId }) => ({
      id, name, description, timestamp, userId
    }));
    res.json(versions);
  });
});

// DELETE /api/versions/:id - Delete a version
app.delete('/api/versions/:id', (req, res) => {
  db.remove({ id: req.params.id }, {}, (err, numRemoved) => {
    if (err || numRemoved === 0) return res.status(404).json({ error: 'Version not found' });
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Versioning server running on http://localhost:${PORT}`);
});