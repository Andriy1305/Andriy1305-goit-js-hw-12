import axios from 'axios';

export const fetchPhotos = async (searchedQuery, page = 1) => {
  const params = {
    key: '48862284-111645087e0508ab98b21d672',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15, // Встановлюємо кількість зображень на сторінку
  };

  try {
    const response = await axios.get('https://pixabay.com/api/', { params });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
