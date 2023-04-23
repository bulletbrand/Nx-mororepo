import React from 'react';
import { ReactComponent as ZoomInIcon } from '../../../assets/icons/zoomInIcon.svg';
import { ReactComponent as ZoomOutIcon } from '../../../assets/icons/zoomOutIcon.svg';
import styles from './PdfViewerZoomButtons.module.scss';

interface IPdfViewerZoomButtonsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const PdfViewerZoomButtons = ({
  onZoomIn,
  onZoomOut,
}: IPdfViewerZoomButtonsProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.iconButton} onClick={() => onZoomOut()}>
        <ZoomOutIcon />
      </button>
      <button className={styles.iconButton} onClick={() => onZoomIn()}>
        <ZoomInIcon />
      </button>
    </div>
  );
};
