/**
 * Created by dev on 22.03.19.
 */

import Rule from './Rule';

/**
 * The class is Facade for analyzing the document, and propose options for a solution to problems.
 *
 * The Analyzer running the {@class Rule}`s by queue
 *
 * @abstract
 */
export default class Analyzer{

    /**
     * @param {Document} document
     */
    constructor(document){

        /** @type {Document} */
        this.document = document;

        /** @type {Array.<Rule>} */
        this.rules = [];
    }

    /**
     * @async
     * @return {Promise} -
     */
    analyze(){
        return new Promise((resolve, reject)=>{
            if(this.rules.length>0){
                this.checkRule(0).then((res)=>{
                    resolve(res);
                }).catch(error=>{
                    reject(error);
                });
            }else{
                reject(new Exception(`The analyzer doesn't have any rules!`, this));
            }
        });
    }

    /**
     * @async
     * @param {number} index - the index of rule
     * @return {Promise}
     */
    checkRule(index){
        return new Promise((resolve, reject)=>{
            let hasError = !this.rules[index].check();

            if(hasError){
                let solutions = this.rules[index].createSolutions();
                
                container.resolve('confirmChangeArcToSplinesDialog').modalOpenConfirmation
                
                solutions.execute();
                
                //todo: create a solution options
                //todo: ask user
                //todo: if user answered than execute list of commands and resolve(true)
                //todo: if user cancel than resolve(false)
                resolve(false);
            }else{
                if(index==this.rules.length-1) {
                    resolve(true);
                }else{
                    this.checkRule(index+1).then((res)=>{
                        resolve(res);
                    }).catch((error)=>{
                        reject(error);
                    });
                }
            }
        });
    }
    
}