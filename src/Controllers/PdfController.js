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

    async searchKeywordInFiles(keyword, pdfFolderPath){
        const files = await this.getPdfFiles(pdfFolderPath)

        const searches = files.map(file => this.searchKeyword(keyword, file))

        const counts = await Promise.all(searches)

        counts.forEach((count, index) => {
            console.log(`${files[index]}: ${count}`);
        });

    }

    async searchKeyword(keyword, file) {
        let textBuffer = '';
        let matches = 0;
        return new Promise((resolve, reject) => {
            new PdfReader().parseFileItems('./public/pdf/' + file, (err, item) => {
                if (err) reject(err);
                else if (!item) {
                    matches = this.countMatches(textBuffer, keyword)
                    console.log(`${file}: ${matches} matches`);
                    resolve(matches);
                }
                else if (item.text) {
                    textBuffer += item.text
                }
            })
        })

    }

    countMatches(content, keyword) {
        const regex = new RegExp(keyword, 'g')
        const matches = (content.match(regex) || []).length;
        return matches;
    }

}

export default new PdfController()