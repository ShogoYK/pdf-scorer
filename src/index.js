import PdfController from './Controllers/PdfController.js';

const startTime = process.hrtime();

const pdfFolderPath = './public/pdf'

const files = await PdfController.getPdfFiles(pdfFolderPath)

// await PdfController.searchKeywordInFiles('have been', pdfFolderPath);

for(let file of files){
    await PdfController.searchKeyword('have been', file)
}

const endTime = process.hrtime(startTime);
const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6;

console.log(`\nExecution time: ${executionTimeInMs.toFixed(2)} ms`);