import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.API_KEY; // Assurez-vous d'avoir la clé API dans vos variables d'environnement
const TMDB_API_URL = 'https://api.themoviedb.org/3/search/movie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    if (!query || Array.isArray(query)) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await fetch(`${TMDB_API_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data); // Renvoie l'erreur de l'API TMDB
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}
