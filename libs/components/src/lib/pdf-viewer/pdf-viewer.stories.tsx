import { Story, Meta } from '@storybook/react';
import { PdfViewer, IPdfViewerProps } from './pdf-viewer';
import singlePdf from '../assets/pdf/lyvyMarketSegment.pdf';
import multiplyPdf from '../assets/pdf/StatementOfReturn.pdf';

export default {
  component: PdfViewer,
  title: 'Pdf Viewer',
} as Meta;

type PdfViewerPropsWithContainerWidth = IPdfViewerProps & {
  containerWidth?: string;
};

const Template: Story<IPdfViewerProps> = (args) => <PdfViewer {...args} />;

const TemplateWrapped: Story<PdfViewerPropsWithContainerWidth> = (args) => {
  return (
    <div style={{ width: args.containerWidth, margin: 'auto' }}>
      <PdfViewer {...args} />
    </div>
  );
};

export const SinglePDF = Template.bind({});

SinglePDF.args = {
  filePath: singlePdf,
};

export const MultiplyPDF = Template.bind({});

MultiplyPDF.args = {
  filePath: multiplyPdf,
};

export const WrongFormatPDF = Template.bind({});

WrongFormatPDF.args = {
  filePath: 'some wrong path',
};

export const SinglePDFInContainer = TemplateWrapped.bind({});

SinglePDFInContainer.args = {
  filePath: singlePdf,
  containerWidth: '450px',
};
