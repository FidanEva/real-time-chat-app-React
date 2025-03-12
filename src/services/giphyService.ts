import axios from 'axios';
import { Gif } from '../types/giph';
const API_KEY: string | undefined = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';

export const searchGifs = async (query: string, page: number): Promise<Gif[]> => {
  if (!API_KEY) {
    console.error('GIPHY API key is missing');
    return [];
  }

  try {
    const response = await axios.get<{ data: Gif[] }>(`${BASE_URL}/search`, {
      params: {
        api_key: API_KEY,
        q: query,
        limit: 25,
        offset: (page - 1) * 25,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching gifs:', error);
    return [];
  }
};

export const getTrendingGifs = async (page: number): Promise<Gif[]> => {
  if (!API_KEY) {
    console.error('GIPHY API key is missing');
    return [];
  }

  try {
    const response = await axios.get<{ data: Gif[] }>(`${BASE_URL}/trending`, {
      params: {
        api_key: API_KEY,
        limit: 25,
        offset: (page - 1) * 25,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching trending gifs:', error);
    return [];
  }
};