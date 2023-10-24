import { useState } from 'react';
import { GalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';

export const ImageGallery = ({ images }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImage, setLargeImageURL] = useState(null);

  const handleimage = largeImage => {
    setLargeImageURL(largeImage);
    setIsShowModal(true);
  };

  const handleModalClose = () => {
    setLargeImageURL(null);
    setIsShowModal(false);
  };

  return (
    <>
      <GalleryList>
        {images.map(img => (
          <ImageGalleryItem key={img.id} images={img} onClick={handleimage} />
        ))}
      </GalleryList>
      {isShowModal && (
        <Modal largeImage={largeImage} onModalClose={handleModalClose} />
      )}
    </>
  );
};
