import { render } from '@testing-library/react';

import PdfViewer from './pdf-viewer';

describe('PdfViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PdfViewer filePath={''}/>);
    expect(baseElement).toBeTruthy();
  });
});
