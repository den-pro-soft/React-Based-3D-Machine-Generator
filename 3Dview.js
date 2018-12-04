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


    var material = new THREE.MeshLambertMaterial( { opacity:0.5, color: 0xcccccc, transparent:false, wireframe: false, side:THREE.DoubleSide } );

    var geometry1 = new THREE.BoxGeometry(20, 20, 20);
    var geometry2 =new THREE.Mesh(new THREE.CylinderGeometry(3,10,10,100,1));
    geometry2.position.set(10,0,10);


    var result = new ThreeBSP(geometry1).subtract(new ThreeBSP(geometry2));

    var geometry = result.toGeometry();

    mesh = new THREE.Mesh(geometry, material);
    // mesh.position.setX(15);

    wireframe = new THREE.WireframeHelper(mesh, 0xffffff);
    // wireframe.position.setX(-15);
    scene.add(wireframe);

    // scene.add(mesh);


    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        spotLight.position.set(camera.position.x * 10, camera.position.y * 10, camera.position.z * 10);
    }
    animate();
};
