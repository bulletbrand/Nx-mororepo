import React from 'react';
import styles from './PdfViewerError.module.scss';

export const PdfViewerError = () => {
  return (
    <div className={styles.wrapper}>
      PDF viewer is not able to display this type of document.
    </div>
  );
};
