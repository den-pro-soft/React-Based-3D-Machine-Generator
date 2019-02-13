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
     */
    save(document) {
        this.getBlobData(document).then(data=>{
            if(data) {
                FileSaver.saveAs(data, document.fileName + this.fileSuffix);
            }
        }).catch(function(error){
            console.error(error);
        });
    }

    /**
     * @param {Document} document
     * @return {Promise} - then has data, the data is Blob object or false if no need to save
     */
    getBlobData(document){
        throw new Exception('The method doesn\'t have implementation');
    }

}