/**
 * Created by dev on 26.12.18.
 */
export default class Exception{
    constructor(massage, data){
        this.data = data;
        this.message = massage;
        // console.error(this.toString());
    }

    toString(){
        if(this.data){
            return this;
        }
        return this.message
    };
}