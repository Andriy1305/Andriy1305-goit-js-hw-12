import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");

if (!galleryContainer) {
  console.error("Gallery container not found!");
}

let lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });

export const createGalleryCard = (imgInfo) => {
  return `
    <li class="gallery-item">
      <a href="${imgInfo.largeImageURL}" class="gallery-link">
        <img src="${imgInfo.webformatURL}" alt="${imgInfo.tags}" width="360" class="gallery-img" loading="lazy"/>
      </a>
      <ul class="gallery-info-list">
        <li><h3>Likes</h3><p>${imgInfo.likes}</p></li>
        <li><h3>Views</h3><p>${imgInfo.views}</p></li>
        <li><h3>Comments</h3><p>${imgInfo.comments}</p></li>
        <li><h3>Downloads</h3><p>${imgInfo.downloads}</p></li>
      </ul>
    </li>`;
};

// Функція рендерингу галереї
export const renderGallery = (images) => {
  if (!galleryContainer) return;

  if (images.length === 0) {
    console.warn("No images to render.");
    return;
  }

  const fragment = document.createDocumentFragment();
  const tempDiv = document.createElement("div");

  tempDiv.innerHTML = images.map(createGalleryCard).join("");

  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild);
  }

  galleryContainer.appendChild(fragment);
  lightbox.refresh(); // Оновлення SimpleLightbox
};

// Функція очищення галереї
export const clearGallery = () => {
  if (!galleryContainer) return;
  galleryContainer.innerHTML = "";
};
