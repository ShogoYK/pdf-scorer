import fs from 'fs';

class PdfController {
    async getPdfFiles(pdfFolderPath) {
        const files = await fs.promises.readdir(pdfFolderPath)
        return files.filter(file => file.endsWith('.pdf'));
    
    }
}

export default new PdfController()