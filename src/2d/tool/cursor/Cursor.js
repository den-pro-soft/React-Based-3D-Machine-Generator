/**
 * Created by dev on 14.01.19.
 *
 * The class need for rendering different cursors
 */
export default class Cursor{
    constructor(){
        this.board;

        this.imageLoad = false;
        this.image = new Image(25, 25);
        this.image.onload = ()=>{this.imageLoad=true;};
    }

    set src(url){
        this.image.src = url;
    }

    /**
     * @param {Point} position
     */
    render(position){
        if(!this.board){
            this.board = container.board; //todo: container
        }else {
            let p = this.board._convertToLocalCoordinateSystem(position);

            this.board._drawArc(p, 5, '#ff641a', 2);
            this.board._drawArc(p, 3, '#ffffff', 2,);

            if(this.imageLoad){
                this.board._context.drawImage(this.image,p.x+10,p.y+10,25,25);
            }
        }
    }

}