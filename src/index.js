import PdfController from './Controllers/PdfController.js';

const pdfFolderPath = './public/pdf'

const files = await PdfController.getPdfFiles(pdfFolderPath)

console.log(files);