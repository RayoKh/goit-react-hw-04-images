import { useState, useEffect } from 'react';
import { Loader } from './Loader/Loader';
import { Error } from './Error/Error';
import { Greeting } from './Greeting/Greeting';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import api from './api/api';
import { Wrapper } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [firstLoading, setFirstLoad] = useState(true);

  const perPage = 12;

  useEffect(() => {
    if (!query) {
      return;
    }

    api
      .fetchImages(query, page, perPage)
      .then(images => {
        if (images.hits.length === 0) {
          setIsEmpty(true);
          setLoading(false);
          setShowBtn(false);
          return;
        }
        setImages(prevImages => [...prevImages, ...images.hits]);
        setShowBtn(page < Math.ceil(images.totalHits / 12));
        setError(null);
      })
      .catch(error => setError(error))
      .finally(() => {
        setLoading(false);
        setFirstLoad(false);
      });
  }, [page, query]);

  const handleSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSearch} />
      {!query && <Greeting />}
      {images.length > 0 && <ImageGallery query={query} images={images} />}
      {!firstLoading && loading && <Loader />}
      {showBtn && <Button onClick={handleLoadMore} />}
      {error && (
        <Error message={'Sorry, something went wrong. Try again later!'} />
      )}
      {isEmpty && <Error message={`Sorry, but we can't find ${query}`} />}
      <GlobalStyle />
    </Wrapper>
  );
}
