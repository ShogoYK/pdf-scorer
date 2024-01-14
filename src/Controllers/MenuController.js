import inquirer from "inquirer";

class MenuController {
    async askPdfFolderPath() {
        const { pdfPath } = await inquirer.prompt({
            type: 'input',
            prefix: '',
            message: 'Insert the folder path to your PDFs:',
            name: 'pdfPath'
        });

        return pdfPath;
    }

    async askKeyword() {
        const { searchInput } = await inquirer.prompt({
            type: 'input',
            prefix: '',
            message: 'Insert the text/word to be searched:',
            name: 'searchInput'
        });

        return searchInput;
    }
}

export default new MenuController()