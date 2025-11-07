const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
// CORS config to only allow deployed frontend
const allowedOrigins = [
    'https://cdfkns.github.io/MercuryAI/',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
];

const corsOption = {
    origin: function (origin, callback)
    {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1)
        {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
};

app.use(cors(corsOptions));

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/generate', async (req, res) =>
{
    const { systemPrompt, userQuery } = req.body;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try
    {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        res.json(data);
    } catch (err)
    {
        res.status(500).json({ error: 'API call failed', details: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
