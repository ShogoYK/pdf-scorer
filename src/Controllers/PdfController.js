import fs from 'fs';
import { PdfReader } from 'pdfreader';
import ConfigController from './ConfigController.js';

class PdfController {
    async getPdfFiles(pdfFolderPath) {
        const files = await fs.promises.readdir(pdfFolderPath)
        return files.filter(file => file.endsWith('.pdf'));
    }

    async searchKeywordInFolder(keyword, folderPath) {
        const files = await this.getPdfFiles(folderPath)

        const searches = files.map(file => this.searchKeyword(keyword, file))

        const counts = await Promise.all(searches)

        counts.forEach(count => {
            count.avg = this.calcAveragePerPage(count.matches, count.pageCount)
        });

        return counts;
    }

    async searchKeyword(keyword, file) {
        let textBuffer = '';
        let matches = 0;
        let pageCount = 0;
        const folderPath = await ConfigController.getPdfFolderPath()

        return new Promise((resolve, reject) => {

            new PdfReader().parseFileItems(folderPath + '/' + file, (err, item) => {
                if (err) reject(err);
                else if (!item) {
                    matches = this.countMatches(textBuffer, keyword)
                    console.log(file + '(' + pageCount + ' pages) found ' + matches + ' matches of ' + `'${keyword}'
                    `);
                    resolve({ file, matches, pageCount });
                }
                else if (item.text) {
                    textBuffer += item.text
                }
                if (item && item.page) {
                    pageCount = Math.max(pageCount, item.page)
                }
            })
        })

    }

    calcAveragePerPage(matches, totalPages) {
        let avg = ((matches) / totalPages).toFixed(2)

        return parseFloat(avg)
    }

    countMatches(content, keyword) {
        const regex = new RegExp(keyword, 'g')
        const matches = (content.match(regex) || []).length;
        return matches;
    }
}

export default new PdfController()