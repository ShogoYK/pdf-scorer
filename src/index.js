import ConfigController from './Controllers/ConfigController.js';
import MenuController from './Controllers/MenuController.js';
import PdfController from './Controllers/PdfController.js';

const startTime = process.hrtime();

console.clear();

// Configuring/Getting Pdf files folder
let pdfFolderPath = await ConfigController.getPdfFolderPath()
if (!pdfFolderPath) {
    pdfFolderPath = await ConfigController.configurePdfFolderPath();
}

console.log('Searching in: ' + pdfFolderPath + '\n');

// Word/Text Searching
const keyword = await MenuController.askKeyword();
console.log(`Searching for '${keyword}'` + '\n');
let search = await PdfController.searchKeywordInFolder(keyword, pdfFolderPath);

// Sorting and printing 
search.sort((a, b) => b.avg - a.avg)
console.log(search);

const endTime = process.hrtime(startTime);
const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6;

console.log(`\nExecution time: ${executionTimeInMs.toFixed(2)} ms`);