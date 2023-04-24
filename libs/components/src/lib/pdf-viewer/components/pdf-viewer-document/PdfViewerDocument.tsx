import React, { useCallback } from 'react';
import { Page, PDFPageProxy } from 'react-pdf';
import { ListChildComponentProps } from 'react-window';
import styles from './PdfViewerDocument.module.scss';
import { useThrottle } from '../../hooks/useThrottle';

interface IPdfViewerDocumentProps {
  setPdfDocumentHeight: (index: number, height: number) => void;
  width: number;
}

export const PdfViewerDocument = ({
  index,
  style,
  data,
}: ListChildComponentProps<IPdfViewerDocumentProps>) => {
  const { setPdfDocumentHeight, width } = data;

  const throttledWidth = useThrottle(width, 300);

  const onRenderSuccess = useCallback(
    ({ _pageIndex, height }: PDFPageProxy) => {
      setPdfDocumentHeight(_pageIndex, height);
    },
    [setPdfDocumentHeight]
  );

  return (
    <div style={style} className={styles.pageWrapper}>
      <Page
        width={throttledWidth}
        key={index}
        className={styles.page}
        pageNumber={index + 1}
        onRenderSuccess={onRenderSuccess}
      />
    </div>
  );
};
