/**
 * Created by dev on 14.02.19.
 */

import Exception from './../Exception';

export default class InvalidDataFormatException extends Exception{
    constructor(massage, data){
        super(massage, data);
    }
}