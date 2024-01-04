import fs from 'fs';
import { PdfReader } from 'pdfreader';

class PdfController {
    async getPdfFiles(pdfFolderPath) {
        const files = await fs.promises.readdir(pdfFolderPath)
        return files.filter(file => file.endsWith('.pdf'));
    }

    writeTxtFiles(pdfFile) {
        const outputFileName = pdfFile.split('.')[0]
        console.log(outputFileName);
        const outputFilePath = './public/txt/' + outputFileName + '.txt'
        let textBuffer = ''
        new PdfReader().parseFileItems("./public/pdf/" + pdfFile, (err, item) => {
            if (err) console.log("errror: ", err);
            else if (!item) {
                fs.writeFileSync(outputFilePath, textBuffer)
            }
            else if (item.text) {
                textBuffer += item.text
            }
        })
    }
}

export default new PdfController()