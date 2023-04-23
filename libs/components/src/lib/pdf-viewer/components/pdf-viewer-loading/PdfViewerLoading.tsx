import React from 'react';
import styles from './PdfViewerLoading.module.scss';

export const PdfViewerLoading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loading} />
    </div>
  );
};
