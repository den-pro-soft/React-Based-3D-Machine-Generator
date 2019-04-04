/**
 * Created by dev on 07.02.19.
 */

import ProcessingLineType from './ProcessingLineType';

export default class Auto extends ProcessingLineType{
    constructor(){
        super();
        this.id=41;
    }

    /**
     * @inheritDoc
     * @return {Auto}
     */
    copy(){
        return new Auto();
    }
}