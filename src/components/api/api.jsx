import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38556698-b3856d862faf8b4ab27b44b8c';

const fetchImages = async (query, page, perPage) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        q: query,
        page,
        per_page: perPage,
      },
    });

    if (response.data.hits.length === 0) {
      return Promise.reject(new Error(`Oops... that's all`));
    }

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const api = {
  fetchImages,
};

export default api;
