import Processing from "../Processing";

export default class Thread extends Processing{

    static TYPE_UN = "UN";
    static TYPE_M = "M";
    static TYPE_NTP = "NTP";
    static TYPE_UD = "User defined";



    constructor(){
        super();

        /** @type {string} */
        this.type = Thread.TYPE_UN;

        /** @type {number} */
        this.length=0;

        /** @type {string} */
        this.parameters= "";
    }

    /**
     * @return {Thread}
     */
    copy() {
        let res = new Thread();
        res.type=this.type;
        res.length= this.length;
        res.parameters= this.parameters;
        return res;
    }
}