import { Movie as MovieType } from '../types/Movie';

export async function fetchMovieInfo(title: string): Promise<MovieType | null> {
  const response = await fetch(`/api/search?query=${encodeURIComponent(title)}`);
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return data.results[0];
  }
  return null;
}

export async function fetchSuggestions(query: string): Promise<MovieType[]> {
  if (query.length < 2) {
    return [];
  }
  const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results || [];
}