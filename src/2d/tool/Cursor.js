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
            this.board = container.resolve('mainBoard'); //todo: maybe set from the using place
        }else {
            let p = this.board._convertToLocalCoordinateSystem(position);

            this.board.style('strokeStyle', '#ff641a');
            this.board.style('lineWidth', 2);   //todo: use theme
            this.board.style('dash', []);
            this.board._drawArc(p, 5, 0, 2*Math.PI);
            this.board.style('strokeStyle', '#ffffff');
            this.board._drawArc(p, 3, 0, 2*Math.PI);

            if(this.imageLoad){
                this.board._context.drawImage(this.image,p.x+10,p.y+10,25,25);
            }
        }
    }

}