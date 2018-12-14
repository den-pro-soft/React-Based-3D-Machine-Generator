var THREE = require("three-js")();
var OrbitControls = require('three-orbit-controls')(THREE);
var ThreeBSP = require('three-js-csg')(THREE);

/**
 * Created by dev on 03.12.18.
 * @param {Object} canvas
 * @param {Object} size -  {width:width, height:height}
 */
var View3D = function (size) {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    var camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 10000);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);


    var renderer = new THREE.WebGLRenderer();

    var dom = renderer.domElement;

    var controls = new OrbitControls(camera,dom);

    console.log(controls);
    renderer.setClearColor("#EEEEEE");

    renderer.setSize(size.width, size.height);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 1000, 100);


    var settings = {
        wireframe:false
    };

    // var gui = new dat.GUI();
    // gui.add(settings, 'wireframe');



    var material = new THREE.MeshLambertMaterial( { opacity:0.5, color: 0xcccccc, transparent:false, wireframe: false, side:THREE.DoubleSide } );

    var mesh = undefined;

    function animate() {
        if(mesh) {
            mesh.material.wireframe = settings.wireframe;
        }
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        spotLight.position.set(camera.position.x * 10, camera.position.y * 10, camera.position.z * 10);
    }
    animate();


    this.resetScene = function(){
        while(scene.children.length > 0){
            scene.remove(scene.children[0]);
        }
        scene.add(spotLight);
    };

    this.resetScene();


    this.getContent = function(){
        return dom;
    };

    this.addGeometryToScene = function(geometry){
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    };


    this.setGeometry = function(gd2){
        console.log(gd2);
        this.resetScene();
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



        var geometry1 = new THREE.BoxGeometry(20, 20, 20);
        var geometry3 = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10));
        geometry3.position.set(6,3,0);

        var geometry2 =new THREE.Mesh(new THREE.CylinderGeometry(3,10,10,100,1));
        geometry2.position.set(10,0,10);


        var result = new ThreeBSP(geometry1).subtract(new ThreeBSP(geometry2));
        result = result.subtract(new ThreeBSP(geometry3));

        var geometry = result.toGeometry();
        this.addGeometryToScene(geometry);
    }
};

global.View3D = View3D;