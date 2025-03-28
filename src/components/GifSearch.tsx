import React, { useState, useEffect, useRef, RefObject } from 'react';
import { searchGifs, getTrendingGifs } from '../services';
import { Gif } from '../types/giph';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useClickOutside } from '../hooks';
import { useTranslation } from 'react-i18next';

const GifSearch: React.FC<{ 
  isGifSearchVisible: Boolean;
  onGifSelect: (gif: Gif) => void; 
  setGifSearchVisible: (value:boolean) => void;
  toggleButtonRef: RefObject<HTMLButtonElement | null>;
}> = ({ isGifSearchVisible, onGifSelect, setGifSearchVisible, toggleButtonRef }) => {

  const [query, setQuery] = useState<string>("");
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useClickOutside(modalRef as RefObject<HTMLElement>, () => {
    if(isGifSearchVisible) {
      setGifSearchVisible(false);
    }
  }, toggleButtonRef);

  const fetchGifs = async (newPage: number, newQuery?: string) => {
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
    if (!hasMore || loading) return;
  
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchGifs(nextPage, query);
      return nextPage;
    });
  };

  return (
    <div className="message-gif" style={{ height: "400px" }} ref={modalRef}>
      <div className="gif-search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={t("gifs.search")}
          className="gif-search-input"
        />
      </div>

      <div style={{ height: '350px', overflow: 'auto' }}>
        <InfiniteScroll
          dataLength={gifs.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="loader">{t("general.loading")}</div>}
          endMessage={<p style={{ textAlign: 'center' }}>{t("gifs.noAvailable")}</p>}
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
