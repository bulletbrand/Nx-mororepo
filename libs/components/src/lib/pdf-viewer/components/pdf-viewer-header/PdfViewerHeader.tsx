import React from 'react';
import { HEADER_TEXTS } from './texts';
import styles from './PdfViewerHeader.module.scss';

interface IPdfViewerHeaderProps {
  filePath: string;
  renderTime: number | null;
}

const getRenderTime = (time: IPdfViewerHeaderProps['renderTime']) => {
  return time ? `${time.toFixed()}ms` : 'Loading...';
};

export const PdfViewerHeader = ({
  filePath,
  renderTime,
}: IPdfViewerHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoSection}>
        <h3 className={styles.title}>{HEADER_TEXTS.LOADED_URL}</h3>
        <span className={styles.loadedUrlText}>{filePath}</span>
      </div>
      <div className={styles.infoSection}>
        <h3 className={styles.title}>{HEADER_TEXTS.RENDER_TIME}</h3>
        <span className={styles.renderTimeText}>
          {getRenderTime(renderTime)}
        </span>
      </div>
    </div>
  );
};
