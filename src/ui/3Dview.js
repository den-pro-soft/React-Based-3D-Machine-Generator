import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);
import {PolygonMeshBuilder} from './3d/GeometryBuilder';
import Point from './../model/Point';

/**
 * Created by dev on 03.12.18.
 * @param {Object} canvas
 * @param {Object} size -  {width:width, height:height}
 */
export default class View3D{
    constructor(size){
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x121212);
        this.camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 10000);
        this.moveCamera(0,300,0);

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

        this.asix = new THREE.AxesHelper(100);

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
        if(ENV =='dev'){
            this.scene.add(this.asix);
        }
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
     * @param {Document} document
     */
    setGeometry(document){
        return new Promise((resolve, reject)=>{
            this.resetScene();
            /** @type {THREE.Mesh} */
            let mesh = this.meshBuilder.getMeshes(document).then((mesh)=>{
                if(mesh){
                    mesh.rotateX(-90* Math.PI/180);

                    let extrenum = Point.getExtrenum(mesh.geometry.vertices.map(v=>new Point(v.x, v.y, v.z)));

                    let dx = extrenum.min.x+(extrenum.max.x-extrenum.min.x)/2;
                    let dy = extrenum.min.y +(extrenum.max.y-extrenum.min.y)/2;
                    let dz = extrenum.min.z +(extrenum.max.z-extrenum.min.z)/2;
                    mesh.translateX(-dx);
                    mesh.translateY(-dy);
                    mesh.translateZ(-dz);

                    this.scene.add(mesh);
                }
                this.mesh=mesh;
                resolve(true);
            });
        });
    }

    clearMemory(){
        this.scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        this.mesh=null;
    }
};
