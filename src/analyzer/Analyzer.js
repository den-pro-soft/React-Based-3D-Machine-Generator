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
            if(this.document._elements.length==0){
                resolve(false);
            }
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
            let t0 = performance.now();
            let hasError = this.rules[index].check();
            var t1 = performance.now();
            console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
            console.log(this.rules[index].errorMessage, hasError, "Analyzer::checkRule");

            if(hasError){
                let solutions = this.rules[index].createSolutions();
                let board = container.resolve('mainBoard');
                let currentSolution = solutions[0];
                board.document = currentSolution.getPreviewDocument();
                board.renderDocument();
                container.resolve('expertNotice',[
                    this.rules[index].errorMessage,
                    solutions.map(solution=>{
                        return {
                            text:solution.name,
                            callback:()=>{
                                board.document = solution.getPreviewDocument();
                                board.renderDocument();
                                currentSolution = solution;
                            }
                        }
                    }),
                    ()=>{
                        board.document = this.document;
                        if(currentSolution==solutions[0]){
                            resolve(false);
                        }else {
                            currentSolution.execute();
                            setTimeout(()=> {
                                this.checkRule(index).then((res)=> {
                                    if(res){
                                        if(index==this.rules.length-1) {
                                            resolve(true);
                                        }else {
                                            this.checkRule(index + 1).then((res1)=> {
                                                resolve(res1);
                                            }).catch((error1)=> {
                                                reject(error1);
                                            });
                                        }
                                    }else{
                                        resolve(false);
                                    }
                                }).catch((error)=> {
                                    reject(error);
                                });
                            }, 500);
                        }
                    },
                    ()=>{
                        board.document = this.document;
                        resolve(false);
                    }
                    ]).show();
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