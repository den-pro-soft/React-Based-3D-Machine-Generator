/**
 * Created by dev on 03.12.18.
 * @param {Object} canvas
 * @param {Object} size -  {width:width, height:height}
 */
var View3D = function (canvas, size) {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    var camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 1000);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);


    var renderer = new THREE.WebGLRenderer({canvas: canvas});

    var controls = new THREE.OrbitControls(camera);

    renderer.setClearColor("#EEEEEE");

    renderer.setSize(size.width, size.height);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 1000, 100);

    scene.add(spotLight);


    var axes = new THREE.AxesHelper(20);
    scene.add(axes);


    var material = new THREE.MeshLambertMaterial( { opacity:0.5, color: 0xcccccc, transparent:false, wireframe: true, side:THREE.DoubleSide } );


    // var vertices = [
    //     new THREE.Vector3(1, 3, 1),
    //     new THREE.Vector3(1, 3, -1),
    //     new THREE.Vector3(1, -1, 1),
    //     new THREE.Vector3(1, -1, -1),
    //     new THREE.Vector3(-1, 3, -1),
    //     new THREE.Vector3(-1, 3, 1),
    //     new THREE.Vector3(-1, -1, -1),
    //     new THREE.Vector3(-1, -1, 1)
    // ];
    // var faces = [
    //     new THREE.Face3(0, 2, 1),
    //     new THREE.Face3(2, 3, 1),
    //     new THREE.Face3(4, 6, 5),
    //     new THREE.Face3(6, 7, 5),
    //     new THREE.Face3(4, 5, 1),
    //     new THREE.Face3(5, 0, 1),
    //     new THREE.Face3(7, 6, 2),
    //     new THREE.Face3(6, 3, 2),
    //     new THREE.Face3(5, 7, 0),
    //     new THREE.Face3(7, 2, 0),
    //     new THREE.Face3(1, 3, 4),
    //     new THREE.Face3(3, 6, 4),
    // ];
    //
    //
    //
    // var geom = new THREE.Geometry();
    // geom.vertices = vertices;
    // geom.faces = faces;
    // geom.computeVertexNormals();
    // geom.computeFaceNormals();
    // geom.mergeVertices();
    //
    //
    // scene.add(new THREE.Mesh(geom,material));

    var cylinderGeometry = new THREE.CylinderGeometry(10,10, 15, 72,1,false);
    var cylinderMesh = new THREE.Mesh( cylinderGeometry, material );
    cylinderMesh.position.set(10,10,0);
    // scene.add( cylinderMesh );

    var cylinder_bsp = new ThreeBSP(cylinderMesh);

    THREE.CSG

    var boxGeormetry = new THREE.BoxGeometry(50, 20, 10);


    var boxMesh = new THREE.Mesh( boxGeormetry, material);
    // boxMesh.position.set(25,0,25);

    var boxMesh_bsp = new ThreeBSP(boxMesh);

    scene.add(boxMesh);
    console.log(boxMesh_bsp);


    var subtract_bsp2 = cylinder_bsp.subtract(boxMesh_bsp); //circle with missing





    // var a = boxMesh_bsp.tree.clone(),
    //     b = cylinder_bsp.tree.clone();
    //
    // a.invert();
    // a.clipTo( b );
    // b.clipTo( a );
    // b.invert();
    // b.clipTo( a );
    // b.invert();
    // a.build( b.allPolygons() );
    // a.invert();
    // a = new ThreeBSP( a );
    // a.matrix = this.matrix;
    // subtract_bsp2 =a;



    var result = subtract_bsp2.toMesh( material );
    result.geometry.computeVertexNormals();
    result.geometry.computeFaceNormals();
    // scene.add(result);


    function animate() {

        requestAnimationFrame(animate);

        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();

        renderer.render(scene, camera);
        spotLight.position.set(camera.position.x * 10, camera.position.y * 10, camera.position.z * 10);

    }

    animate();
};
