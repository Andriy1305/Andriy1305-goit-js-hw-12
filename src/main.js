import iziToast from 'izitoast';
import { fetchPhotos } from './js/pixabay-api';
import { createGalleryCard, renderGallery, clearGallery } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
let searchQuery = '';
let currentPage = 1;

const formSubmit = async (event) => {
  event.preventDefault();
  const loader = document.querySelector('.loader-container');
  loader.style.display = 'block';

  searchQuery = event.currentTarget.elements.query.value.trim();
  currentPage = 1; // Скидаємо сторінку до першої при новому запиті
  loadMoreBtn.style.display = 'none'; // Ховаємо кнопку перед новим пошуком

  if (searchQuery === '') {
    loader.style.display = 'none';
    iziToast.error({
      message: 'Please complete the form',
      messageColor: '#fafafb',
      icon: 'fas fa-keyboard',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
    return;
  }

  try {
    const data = await fetchPhotos(searchQuery, currentPage);
    
    clearGallery(); // Очищаємо галерею перед новими результатами

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, no images match your query.',
        messageColor: '#fafafb',
        icon: 'far fa-file-image',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fafafb',
      });
      return;
    }

    renderGallery(data.hits); // Відображаємо нові зображення

    if (data.totalHits > currentPage * 15) {
      loadMoreBtn.style.display = 'block'; // Показуємо кнопку, якщо є ще зображення
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong',
      messageColor: '#fafafb',
      icon: 'fas fa-exclamation-triangle',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
  } finally {
    loader.style.display = 'none';
  }

  event.target.reset();
};

const loadMoreImages = async () => {
  currentPage += 1;
  const loader = document.querySelector('.loader-container');
  loader.style.display = 'block';
  loadMoreBtn.style.display = 'none'; // Ховаємо кнопку перед завантаженням

  try {
    const data = await fetchPhotos(searchQuery, currentPage);

    if (data.hits.length === 0) {
      clearGallery(); // Очищаємо галерею, якщо немає результатів
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fafafb',
        icon: 'far fa-file-image',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fafafb',
      });
      return;
    }

    renderGallery(data.hits);

    if (data.totalHits > currentPage * 15) {
      loadMoreBtn.style.display = 'block'; // Показуємо кнопку, якщо ще є зображення
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fafafb',
        icon: 'far fa-file-image',
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#fafafb',
      });
    }

    const cardHeight = document.querySelector('.gallery-item')?.getBoundingClientRect().height || 0;
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

  } catch (error) {
    iziToast.error({
      message: 'Something went wrong',
      messageColor: '#fafafb',
      icon: 'fas fa-exclamation-triangle',
      position: 'topRight',
      backgroundColor: '#ef4040',
      color: '#fafafb',
    });
  } finally {
    loader.style.display = 'none';
  }
};

form.addEventListener('submit', formSubmit);
loadMoreBtn.addEventListener('click', loadMoreImages);
