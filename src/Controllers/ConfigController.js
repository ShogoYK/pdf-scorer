import fs from 'fs';
import MenuController from './MenuController.js';

class ConfigController {
    async init() {
        let json = `{ "pdfFilePath": "" }`
        fs.writeFileSync('./config.json', json)
    }

    async getPdfFolderPath() {
        if (!fs.existsSync('./config.json')) {
            await this.init();
        }

        const folderPath = await JSON.parse(fs.readFileSync('./config.json'))

        return folderPath.pdfFilePath;
    }

    async configurePdfFolderPath() {
        const path = await MenuController.askPdfFolderPath();

        let config = JSON.parse(fs.readFileSync('./config.json'))
        config.pdfFilePath = path;

        fs.writeFileSync('./config.json', JSON.stringify(config));

        return config.pdfFilePath;
    }
}

export default new ConfigController()