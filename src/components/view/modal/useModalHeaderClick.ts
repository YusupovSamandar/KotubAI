import { useEffect } from 'react';

export const useModalHeaderClick = (onClick) => {
  useEffect(() => {
    // Selecting the modal header
    const header = document.querySelector('.ant-modal-header');
    if (header) {
      header.addEventListener('click', onClick);
    }

    // Cleanup function
    return () => {
      if (header) {
        header.removeEventListener('click', onClick);
      }
    };
  }, [onClick]);
};
