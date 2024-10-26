import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.API_KEY;
const TMDB_API_URL = 'https://api.themoviedb.org/3/search/movie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { query } = req.query;

    if (!query || Array.isArray(query)) {
        return res.status(400).json({ error: 'Invalid query parameter' });
    }

    if (!API_KEY) {
        return res.status(500).json({ error: 'API key is not configured' });
    }

    try {
        const response = await fetch(`${TMDB_API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData.status_message || 'TMDB API error' });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}