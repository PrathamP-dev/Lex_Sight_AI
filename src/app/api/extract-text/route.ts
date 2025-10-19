import { NextRequest, NextResponse } from 'next/server';
import { getTextExtractor } from 'office-text-extractor';
import Tesseract from 'tesseract.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function extractFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdfParse = await import('pdf-parse');
    const pdf = pdfParse.default || pdfParse;
    const data = await pdf(buffer);
    const extractedText = data.text.trim();
    
    if (extractedText.length > 50) {
      return extractedText;
    }
    
    console.log('PDF appears to be scanned or has minimal text, attempting OCR...');
    return await performOCR(buffer);
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

async function extractFromDOCX(buffer: Buffer): Promise<string> {
  try {
    const extractor = getTextExtractor();
    const text = await extractor.extractText({
      input: buffer,
      type: 'buffer'
    });
    return text.trim();
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw new Error('Failed to extract text from DOCX');
  }
}

async function performOCR(buffer: Buffer, languages: string = 'eng+hin+mar+tam+kan+tel'): Promise<string> {
  try {
    const { data: { text } } = await Tesseract.recognize(
      buffer,
      languages,
      {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );
    return text.trim();
  } catch (error) {
    console.error('OCR error:', error);
    try {
      const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
      return text.trim();
    } catch (fallbackError) {
      console.error('OCR fallback error:', fallbackError);
      throw new Error('Failed to perform OCR on document');
    }
  }
}

async function extractFromImage(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    return await performOCR(buffer);
  } catch (error) {
    console.error('Image extraction error:', error);
    throw new Error('Failed to extract text from image');
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type;
    const fileName = file.name.toLowerCase();
    
    let extractedText = '';
    
    if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
      extractedText = await extractFromPDF(buffer);
    } 
    else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      extractedText = await extractFromDOCX(buffer);
    }
    else if (
      mimeType === 'application/msword' ||
      fileName.endsWith('.doc')
    ) {
      extractedText = await extractFromDOCX(buffer);
    }
    else if (mimeType === 'text/plain' || fileName.endsWith('.txt')) {
      extractedText = buffer.toString('utf-8');
    }
    else if (
      mimeType === 'application/rtf' ||
      fileName.endsWith('.rtf')
    ) {
      extractedText = buffer.toString('utf-8');
    }
    else if (
      mimeType.startsWith('image/') ||
      fileName.match(/\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i)
    ) {
      extractedText = await extractFromImage(buffer, mimeType);
    }
    else {
      return NextResponse.json(
        { 
          error: 'Unsupported file type',
          supportedTypes: 'PDF, DOCX, DOC, TXT, RTF, and images (JPG, PNG, etc.)'
        },
        { status: 400 }
      );
    }

    if (!extractedText || extractedText.length < 10) {
      return NextResponse.json(
        { 
          error: 'No text could be extracted from the document',
          extractedText: extractedText || ''
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      fileName: file.name,
      fileType: mimeType,
      textLength: extractedText.length
    });

  } catch (error) {
    console.error('Text extraction error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to extract text from document',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
