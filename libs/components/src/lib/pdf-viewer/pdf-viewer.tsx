import React, { useRef, useState } from 'react';
import { Document, pdfjs } from 'react-pdf';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as PDFList } from 'react-window';
import { useGesture } from '@use-gesture/react';
import {
  PdfViewerError,
  PdfViewerHeader,
  PdfViewerLoading,
  PdfViewerZoomButtons,
  PdfViewerDocument,
} from './components';
import { useMeasureRenderTime } from './hooks/useMeasureRenderTime';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import styles from './pdf-viewer.module.scss';
import {
  DEFAULT_DOCUMENT_HEIGHT,
  DEFAULT_LIST_HEIGHT,
  DEFAULT_LIST_WIDTH,
} from './constants/sizes';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export interface IPdfViewerProps {
  filePath: string;
}

export function PdfViewer({ filePath }: IPdfViewerProps) {
  const [pdfLoadError, setPdfLoadError] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });

  const pdfListRef = useRef<PDFList | null>(null);
  const rowHeights = useRef<Record<string, number>>({});
  const documentWrapperRef = useRef<HTMLDivElement | null>(null);
  const documentRef = useRef<HTMLDivElement | null>(null);

  const { renderTime, updateRenderTime } = useMeasureRenderTime();

  const [lastLeftBoforeLock, setLastLeftBeforeLock] = useState<null | number>(
    null
  );

  const onDocumentLoadSuccess = ({ numPages }: pdfjs.PDFDocumentProxy) => {
    updateRenderTime();
    setPageCount(numPages);
  };

  useGesture(
    {
      onDrag: ({ offset: [dx, dy], direction: [x, y] }) => {
        //LEFT LIMIT CHECK
        const wrapperLeft =
          documentWrapperRef.current?.getBoundingClientRect().left || 0;

        const childLeft =
          documentRef.current?.getBoundingClientRect().left || 0;

        const leftLimit = wrapperLeft <= childLeft && x > 0;

        if (leftLimit) {
          setLastLeftBeforeLock(dx);
        }

        if (leftLimit) {
          return setCrop((crop) => ({ ...crop, x: crop.x, y: dy }));
        }

        if (crop.scale > 1) {
          setCrop((crop) => ({ ...crop, x: dx, y: dy }));
        }
      },
      onPinch: ({ offset: [d] }) => {
        if (d > 1) setCrop((crop) => ({ ...crop, scale: 1 + d / 50 }));
      },
    },
    {
      target: documentRef,
    }
  );

  const zoomIn = () => {
    setCrop((crop) => ({ ...crop, scale: crop.scale + 1 }));
  };

  const zoomOut = () => {
    if (crop.scale - 1 <= 1) {
      return setCrop((crop) => ({ x: 0, y: 0, scale: 1 }));
    }

    if (crop.scale > 1) {
      setCrop((crop) => ({ ...crop, scale: crop.scale - 1 }));
    }
  };

  const getPdfDocumentHeight = (index: number) => {
    return rowHeights.current[index] + 8 || DEFAULT_DOCUMENT_HEIGHT;
  };

  const setPdfDocumentHeight = (index: number, size: number) => {
    pdfListRef.current?.resetAfterIndex(0); // call pdf document recalculation
    rowHeights.current = { ...rowHeights.current, [index]: size + 8 };
  };

  if (pdfLoadError) return <PdfViewerError />;

  return (
    <div className={styles.wrapper}>
      <PdfViewerHeader filePath={filePath} renderTime={renderTime} />
      <PdfViewerZoomButtons onZoomIn={zoomIn} onZoomOut={zoomOut} />
      <div className={styles.documentWrapper} ref={documentWrapperRef}>
        <div
          className={styles.documentContainer}
          ref={documentRef}
          style={{
            transform: `scale(${crop.scale})`,
            top: `${crop.y}px`,
            left: `${crop.x}px`,
            position: 'relative',
          }}
        >
          <Document
            loading={<PdfViewerLoading />}
            className={styles.document}
            file={filePath}
            onLoadError={() => setPdfLoadError(true)}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <AutoSizer>
              {({ height, width }) => (
                <PDFList
                  overscanCount={1}
                  ref={pdfListRef}
                  itemData={{
                    setPdfDocumentHeight,
                    width: width || DEFAULT_LIST_WIDTH,
                  }}
                  itemSize={getPdfDocumentHeight}
                  height={height || DEFAULT_LIST_HEIGHT}
                  width={width || DEFAULT_LIST_WIDTH}
                  itemCount={pageCount}
                >
                  {PdfViewerDocument}
                </PDFList>
              )}
            </AutoSizer>
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;
