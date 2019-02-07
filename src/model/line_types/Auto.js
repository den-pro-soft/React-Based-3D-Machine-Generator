/**
 * Created by dev on 07.02.19.
 */

import LineType from './LineType';

export default class Auto extends LineType{
    constructor(){
        super();
        
    }

    copy(){
        return new Auto();
    }
}