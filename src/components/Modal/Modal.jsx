import { useEffect } from 'react';
import { Overlay, ModalWrapper } from './Modal.styled';

export function Modal({ largeImage, onModalClose }) {
  const { largeImageURL } = largeImage;

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === `Escape`) {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleBackdropeClick = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropeClick}>
      <ModalWrapper>
        <img src={largeImageURL} alt="LargeImage" />
      </ModalWrapper>
    </Overlay>
  );
}
