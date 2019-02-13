import FileSaver from 'file-saver';

export default class FileLoader {
    constructor() {
        this.fileSuffix = '.emsx';
    }

    /**
     * @param {string} fileName
     * @return {Document}
     */
    load(fileName){
        throw new Exception('The method doesn\'t have implementation');
    }

    /**
     * @param {Document} document
     * @return {string} fileName
     */
    save(document) {
        let data = this.getBlobData(document);
        if(data) {
            FileSaver.saveAs(data, document.fileName + this.fileSuffix);
            return document.fileName;
        }
    }

    /**
     * @param {Document} document
     * @return {Blob|boolean} - false if no need to save
     */
    getBlobData(document){
        throw new Exception('The method doesn\'t have implementation');
    }

}