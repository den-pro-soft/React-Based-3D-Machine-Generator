

export default class Order{


    constructor(){

        /** @type {string} - the name of costumer */
        this.name = "";

        /** @type {Address} - the address of costumer */
        this.customerAddress = null;

        this.phone = "";

        this.email = "";

        this.shippingname = "";

        /** @type {Address} - the address of shipping */
        this.shippingAddress = null;

        this.shippingPhone = "";

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

        this.shippingMethod = "Ground";

        this.shippingPrice = "";

        this.shippingMethidId = 4;

        this.totalCost = "$310.92";

        this.businessDays = 15;

        /** @type {Document} */
        this.document = null;


    }
}