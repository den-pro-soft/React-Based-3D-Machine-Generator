/**
 * Created by dev on 06.02.19.
 */


export default class LineType{
    constructor(){
        this.name='Auto';
        this.label = "Auto";
        this.id=14;
    }
    
    copy(){
        throw new Exception('The method doesn\'n have implementation.');
    }

    /**
     * The method is used to draw a line when rendering a render. As properties are used the name of styles for canvas.
     * @return {Array.<{propName:value}>}
     */
    getLineStyle(){
        let res = [];
        res['lineWidth']=1;
        res['dash']=[];
        res['strokeStyle']='#222222';
        return res;
    }
}