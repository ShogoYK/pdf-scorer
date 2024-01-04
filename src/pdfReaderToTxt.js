import { PdfReader } from 'pdfreader'
import fs from 'fs'

const outputFile = './public/pdf/out.txt'
let textBuffer = ''
new PdfReader().parseFileItems("./public/pdf/30150625-criacao-de-pdf-a.pdf", (err, item) => {
    if (err) console.log("errror: ", err);
    else if(!item){
        fs.writeFileSync(outputFile, textBuffer)
    } 
    else if(item.text){
        textBuffer += item.text
    } 
})