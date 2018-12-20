/**
 * Created by dev on 19.12.18.
 */

import TriangulationAlgorithm from './../TriangulationAlgorithm';

export default class SimpleTriangulationAlgorithm extends TriangulationAlgorithm{

    /**
     * @inheritDoc
     */
    getTriangles(vertices){
        if(vertices.length<3){
            throw new Exception('Too fwe vertices for triangulation!');
        }
        let res = [];
        for(let i=2; i<vertices.length; i++){
            res.push([0,i-1,i]);
        }
        return res;
    }
}
