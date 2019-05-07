

export default class Order{


    constructor(){

        /** @type {User} */
        this.costomer = null;

        /** @type {User} */
        this.shipping = null;

        /** @type {number} */
        this.quantity=0;

        /** @type {Material} */ //todo: create the Material class
        this.material = null;

        /** @type {Finish} */ //todo: create the Finish class
        this.finish = null;

        /** @type {CreditCard} */
        this.creditCard = null;

        /** @type {string} */
        this.additionalInstructions = "TEST";

        /** @type {Shipping} */
        this.shipping=null;

        this.totalCost = "$310.92";

        this.businessDays = 15;

        /** @type {Document} */
        this.document = null;


    }
}