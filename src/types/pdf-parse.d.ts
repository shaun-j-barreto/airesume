declare module "pdf-parse/lib/pdf-parse.js" {
  import { Buffer } from "buffer";

  interface PDFData {
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: any;
    version: string;
  }

  export default function pdfParse(dataBuffer: Buffer): Promise<PDFData>;
}
