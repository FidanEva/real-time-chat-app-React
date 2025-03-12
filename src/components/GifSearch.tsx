import React, { useState, useEffect } from 'react';
import { searchGifs, getTrendingGifs } from '../services/giphyService';
import { Gif } from '../types/giph';
import InfiniteScroll from 'react-infinite-scroll-component';

const GifSearch: React.FC<{ onGifSelect: (gif: Gif) => void }> = ({ onGifSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGifs = async (newPage: number, newQuery?: string) => {
    console.log("fetch gifs")
    if (loading) return;
    
    setLoading(true);
    let results: Gif[] = [];

    try {
      if (newQuery?.trim() === '' || !newQuery) {
        results = await getTrendingGifs(newPage);
      } else {
        results = await searchGifs(newQuery, newPage);
      }

      if (results.length < 25) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      
      if (newPage === 1) {
        setGifs(results);
      } else {
        setGifs((prevGifs) => {
          const uniqueGifs = Array.from(
            new Map([...prevGifs, ...results].map((gif) => [gif.id, gif])).values()
          );
          return uniqueGifs;
        });
       }
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setGifs([]);
    setPage(1);
    setHasMore(true);
    fetchGifs(1, newQuery);
  };

  useEffect(() => {
    fetchGifs(1);
  }, []);

  const fetchMoreData = () => {
    console.log("fetchMoreData")
    if (!hasMore || loading) return;
  
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchGifs(nextPage, query);
      return nextPage;
    });
  };

  return (
    <div className="message-gif" style={{ height: '400px', overflow: 'hidden' }}>
      <div className="gif-search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for GIFs"
          className="gif-search-input"
        />
      </div>

      <div style={{ height: '350px', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={gifs.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="loader">Loading...</div>}
          endMessage={<p style={{ textAlign: 'center' }}>No more GIFs available</p>}
          scrollableTarget="gif-scroll-container"
        >
          <div className="gif-grid"  id="gif-scroll-container">
            {gifs.map((gif) => (
              <img
                className="gif-item"
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                onClick={() => onGifSelect(gif)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default GifSearch;
