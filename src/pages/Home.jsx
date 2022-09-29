import React, { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Searchbar from '../components/SearchBar';
import classes from './Home.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import axios from '../axios';

export const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(-1);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalPages = useRef(null);

  const loadRef = useRef(null);
  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(handleObserver, option);
    if (loadRef.current) observer.observe(loadRef.current);
  }, [handleObserver, loadRef]);

  const handleNewSearch = () => {
    setPhotos([]);
    setPage(1);
  };

  const searchPhotos = () => {
    if (page === -1) return;
    const res = async () =>
      await axios.get('/search/photos', {
        params: {
          query: searchValue,
          page: page,
        },
      });
    res()
      .then((res) => {
        setPhotos((p) => [
          ...p,
          ...res.data.results.map((photo) => ({
            url: photo.urls.regular,
            id: photo.id,
            alt: photo.alt_description,
            user: photo.user,
          })),
        ]);
        totalPages.current = res.data.total_pages;
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    if (searchValue === '') return;
    if (totalPages.current === page - 1) {
      setLoading(false);
      return;
    }
    searchPhotos();
  }, [page]);

  return (
    <div
      style={{
        paddingBottom: '2em',
      }}
    >
      <div
        style={{
          maxWidth: '100vw',
        }}
      >
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} handleSubmit={handleNewSearch} />
        <div>
          <picture>
            <img
              alt="title"
              className={classes.coverImage}
              role="presentation"
              src="https://images.unsplash.com/photo-1663001489521-d254c4af16b3?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&amp;auto=format%2Ccompress&amp;fit=crop&amp;w=1000&amp;h=1000"
            />
          </picture>
          <div
            style={{
              position: 'relative',
            }}
          >
            <div className={classes.headerText}>
              <div className={classes.headerBody}>
                <div className={classes.headerSpans}>
                  <h1>Unsplash</h1>
                  <p>The internet’s source for visuals.</p>
                  <p>Powered by creators everywhere.</p>
                </div>
                <div>
                  <Searchbar searchValue={searchValue} setSearchValue={setSearchValue} handleSubmit={handleNewSearch} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.photoArea}>
          <div className={classes.columnGrid}>
            {photos.slice(0, photos.length / 2).map((photo) => (
              <img className={classes.imageStyle} src={photo.url} alt={photo.alt} key={photo.id} />
            ))}
          </div>
          <div className={classes.columnGrid}>
            {photos.slice(photos.length / 2, photos.length).map((photo) => (
              <img className={classes.imageStyle} src={photo.url} alt={photo.alt} key={photo.id} />
            ))}
          </div>
        </div>
      </div>
      {loading && (
        <div style={{ ...(photos.length === 0 && { display: 'none' }) }} className={classes.loader} ref={loadRef}>
          <CircularProgress size={60} />
        </div>
      )}
    </div>
  );
};
