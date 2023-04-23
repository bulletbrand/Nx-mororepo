import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  PdfViewerError,
  PdfViewerHeader,
  PdfViewerLoading,
  PdfViewerZoomButtons,
  PdfViewerPagination,
} from './components';
import { useMeasureRenderTime } from './hooks/useMeasureRenderTime';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import styles from './pdf-viewer.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export interface IPdfViewerProps {
  filePath: string;
}

export function PdfViewer({ filePath }: IPdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const { renderTime, updateRenderTime } = useMeasureRenderTime();

  const onDocumentLoadSuccess = ({ numPages }: pdfjs.PDFDocumentProxy) => {
    updateRenderTime();
    setPageCount(numPages);
  };

  const onChangeCurrentPage = (
    page: number,
    resetPdfViewerZoom: () => void
  ) => {
    setCurrentPage(page);
    resetPdfViewerZoom();
  };

  const isPaginationVisible = pageCount > 1;

  if (pdfLoadError) return <PdfViewerError />;

  return (
    <TransformWrapper initialScale={1}>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div className={styles.wrapper}>
          <PdfViewerHeader filePath={filePath} renderTime={renderTime} />
          <PdfViewerZoomButtons onZoomIn={zoomIn} onZoomOut={zoomOut} />
          <div className={styles.documentContainer}>
            <TransformComponent wrapperClass={styles.transformDocumentWrapper}>
              <Document
                loading={<PdfViewerLoading />}
                className={styles.document}
                file={filePath}
                onLoadError={() => setPdfLoadError(true)}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={currentPage} renderAnnotationLayer={false} />
              </Document>
            </TransformComponent>
          </div>
          {isPaginationVisible && (
            <PdfViewerPagination
              currentPage={currentPage}
              pageCount={pageCount}
              onChangeCurrentPage={(page) =>
                onChangeCurrentPage(page, resetTransform)
              }
            />
          )}
        </div>
      )}
    </TransformWrapper>
  );
}

export default PdfViewer;
