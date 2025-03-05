import React, { useState } from 'react';
import { searchGifs, getTrendingGifs } from '../services/giphyService';
import { Gif } from '../types/giph';
import { useEffect } from 'react';

interface GifSearchProps {
  onGifSelect: (gif: Gif) => void;
}

const GifSearch: React.FC<GifSearchProps> = ({ onGifSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleSearch = async () => {
    const results: Gif[] = await searchGifs(query);
    setGifs(results);
  };

  const handleTrendingGifs = async () => {
    const results: Gif[] = await getTrendingGifs();
    setGifs(results);
  };

  useEffect(() => {
    handleTrendingGifs();
  }, []);

  return (
    <div className='message-gif'>
      <div className='gif-search-container'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for GIFs"
          />
        <button className="gif-search" onClick={handleSearch}>Search</button>
      </div>
      <div className='gif-grid'>
        {gifs.map((gif) => (
          <img
            className='gif-item'
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            onClick={() => onGifSelect(gif)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
};

export default GifSearch;
