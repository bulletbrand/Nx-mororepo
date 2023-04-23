import React from 'react';
import styles from './PdfViewerPagination.module.scss';

interface IPdfViewerPaginationProps {
  currentPage: number;
  pageCount: number;
  onChangeCurrentPage: (page: number) => void;
}

export const PdfViewerPagination = ({
  currentPage,
  pageCount,
  onChangeCurrentPage,
}: IPdfViewerPaginationProps) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => onChangeCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {pageCount}
      </span>
      <button
        className={styles.button}
        onClick={() => onChangeCurrentPage(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        &gt;&gt;
      </button>
    </div>
  );
};
