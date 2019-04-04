import FileSaver from 'file-saver';

export default class FileLoader {
    constructor() {
        this.fileSuffix = '.emsx';
    }

    /**
     * @param {File} file
     * @return {Promise}  - "then" has data, the data is {@class Document} object or false if no need to save
     */
    load(file){
        //todo: check if file isn't .emsx file
        return new Promise((resolve, reject)=>{
            if (!file) {
                reject('File is required parameter!');
            }
            var reader = new FileReader();
            reader.onload = (e)=> {
                var contents = e.target.result;
                if(this.validate(contents)) {
                    this.convertDataToDocument(contents).then(doc=>{
                        doc.fileName = file.name;
                        resolve(doc);
                    }); //todo: catch
                }
            };
            this.initRead(reader, file);
        });
    }

    /**
     * The method is necessary to choose the right type of reader.
     * In implementation the method must call reader.readAs...(file) function.
     * for example <code> reader.readAsText(file); </code> for reading text file.
     * @see{@link https://www.w3.org/TR/file-upload/#reading-a-file}
     * @param {FileReader} reader
     * @param {File} file
     */
    initRead(reader, file){
        throw new Exception('The method doesn\'t have implementation');
    }

    /**
     * @param {*} data - The format of the data depends on the format of the data when saving and reading the file.
     * @return {bool} - true if data is valid
     * @throws {InvalidDataFormatException}
     */
    validate(data){
        throw new Exception('The method doesn\'t have implementation');
    }


    /**
     * @param {*} data - The format of the data depends on the format of the data when saving and reading the file.
     * @return {Promise}  - "then" has data, the data is {@class Document} object or false if no need to save
     */
    convertDataToDocument(data){
        throw new Exception('The method doesn\'t have implementation');
    }

    /**
     * @param {Document} document
     */
    save(document) {
        this.getBlobData(document).then(data=>{
            if(this.validate(data)) {
                let filename = document.fileName;
                if(!document.fileName.endsWith(this.fileSuffix)){
                    filename+=this.fileSuffix;
                }

                FileSaver.saveAs(data, filename);
            }
        }).catch(function(error){
            console.error(error);
        });
    }

    /**
     * @param {Document} document
     * @return {Promise} - "then" has data, the data is {@class Blob} object or false if no need to save
     */
    getBlobData(document){
        throw new Exception('The method doesn\'t have implementation');
    }

}