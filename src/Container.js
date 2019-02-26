/**
 * Created by dev on 26.02.19.
 */

import { Injectable, Container, LifeTime } from 'container-ioc';


import Config from './Config';
import {InteractiveBoard} from './2d/Board'
import IdGenerator from './model/IdGenerator';


/**
 * For using container.resolve('token');
 */
const container = new Container(LifeTime.Persistent);
container.register([
    { token: 'config', useClass: Config },
    { token: 'mainBoard', useClass: InteractiveBoard },
    { token: 'elementIdGenerator', useClass: IdGenerator },
    { token: 'commandIdGenerator', useClass: IdGenerator }
]);


export default container;
global.container = container;


