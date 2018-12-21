var THREE = require("three-js")();
var OrbitControls = require('three-orbit-controls')(THREE);
import {PolygonMeshBuilder} from './3d/GeometryBuilder';

/**
 * Created by dev on 03.12.18.
 * @param {Object} canvas
 * @param {Object} size -  {width:width, height:height}
 */
class View3D{
    constructor(size){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x121212);
        this.camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 10000);
        this.moveCamera(0,400,300);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.dom = this.renderer.domElement;
        this.controls = new OrbitControls(this.camera, this.dom);

        this.dom.addEventListener('mousedown',()=>{
            this.dom.style.cursor = "move";
        });
        this.dom.addEventListener('mouseup',()=>{
            this.dom.style.cursor = "default";
        });
        this.renderer.setClearColor("#EEEEEE");

        this.renderer.setSize(size.width, size.height);

        this.spotLight = new THREE.SpotLight(0xcccccc);
        this.spotLight.position.set(100, 1000, 100);

        this.material = new THREE.MeshLambertMaterial( {
            opacity:0.5,
            color: 0xcccccc,
            transparent:false,
            wireframe: false,
            side:THREE.DoubleSide,
            emissive: 0x444444,
            emissiveIntensity: 1
        } );

        this.mesh = undefined;

        this.asix = new THREE.AxisHelper(100);

        this.meshBuilder = new PolygonMeshBuilder(this.material);
        this.animate();
        this.resetScene();
    }

    moveCamera(x,y,z){
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
        this.camera.lookAt(this.scene.position);
    }


    animate() {
        requestAnimationFrame(()=>{this.animate()});
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.spotLight.position.set(this.camera.position.x * 10, this.camera.position.y * 10, this.camera.position.z * 10);
    }


    resetScene(){
        while(this.scene.children.length > 0){
            this.scene.remove(this.scene.children[0]);
        }
        this.scene.add(this.spotLight);
        this.scene.add(this.asix);
    };

    /**
     * @public
     * @return {*}
     */
    getContent(){
        return this.dom;
    };



    /**
     * @public
     * @param elements
     * @param groups
     */
    setGeometry(elements, groups){
        groups = groups.filter(x=>x.E.reduce((res,e)=>res&elements[e].enable)); //filtering groups with disabled items
        this.resetScene();
        let meshes = this.meshBuilder.getMeshes(elements, groups);

        for(let mesh of meshes){
            mesh.rotateX(-90* Math.PI/180);
            this.scene.add(mesh);

            mesh = new THREE.Mesh(mesh.geometry,new THREE.MeshLambertMaterial( {
                opacity:0.5,
                color: 0xcccccc,
                transparent:false,
                wireframe: true,
                side:THREE.DoubleSide,
                emissive: 0x444444,
                emissiveIntensity: 1
            }));
            mesh.rotateX(-90* Math.PI/180);
            this.scene.add(mesh);
        }
        

        //
        // var circles = [];
        // var polilynes = [];
        //
        // for(var i=0; i<gd2.length; i++){
        //     if((gd2[i].type=="polyline" || gd2[i].type=="circle") && gd2[i].enable){
        //         var shape = new THREE.Shape();
        //         for(var j=0; j<gd2[i].P.length; j++){
        //             if(j==0){
        //                 shape.moveTo(gd2[i].P[j].X,gd2[i].P[j].Y);
        //             }else{
        //                 shape.lineTo(gd2[i].P[j].X,gd2[i].P[j].Y);
        //             }
        //         }
        //         var extrudeSettings= {
        //                 steps: 0,
        //                 depth: 0,
        //                 bevelEnabled: true,
        //                 bevelThickness: gd2[i].type=="circle"?11:10,
        //                 bevelSize: 0,
        //                 bevelSegments: 1
        //             };
        //         var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
        //         if(gd2[i].type=="circle"){
        //             circles.push(geometry);
        //         }else{
        //             polilynes.push(geometry);
        //         }
        //     }
        // }
        //
        // for(var i=0; i<polilynes.length; i++){
        //     for(var j=0; j<circles.length; j++){
        //         polilynes[i] = new ThreeBSP(polilynes[i]).subtract(new ThreeBSP(circles[j])).toGeometry();
        //     }
        // }
        // for(var i=0; i<polilynes.length; i++){
        //     this.addGeometryToScene(polilynes[i]);
        // }
        // for(var j=0; j<circles.length; j++){
        //     this.addGeometryToScene(circles[j]);
        // }



        // var geometry1 = new THREE.BoxGeometry(20, 20, 20);
        // var geometry3 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10));
        // geometry3.position.set(6,3,0);
        //
        // var geometry2 =new THREE.Mesh(new THREE.CylinderGeometry(3,10,10,100,1));
        // geometry2.position.set(10,0,10);
        //
        //
        // var result = new ThreeBSP(geometry1).subtract(new ThreeBSP(geometry2));
        // result = result.subtract(new ThreeBSP(geometry3));
        //
        // var geometry = result.toGeometry();
        // this.addGeometryToScene(geometry);
    }
};

global.View3D = View3D;