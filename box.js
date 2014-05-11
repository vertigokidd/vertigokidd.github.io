$(document).ready(function() {

  // To display anything, we need a scene, a camera, and a renderer

  var scene = new THREE.Scene();

  // PerspectiveCamera takes four arguments
  var camera = new THREE.PerspectiveCamera( 75, // Field of view
                                            window.innerWidth / window.innerHeight, // Aspect ratio 
                                            0.1, // near clipping
                                            1000 ); // far clipping

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Shadows
  renderer.shadowMapEnabled = true;

  $("body").append(renderer.domElement); // Append renderer to DOM


  // Add the cube

  var geometry = new THREE.BoxGeometry(2,2,2);
  var material = new THREE.MeshPhongMaterial( { color: 0xFF3366, 
                                                specular: 0x424242 } );
  var cube = new THREE.Mesh(geometry, material);

  cube.castShadow = true;

  scene.add(cube); // Cube will be added to (0,0,0)

  // Add ground

  var groundGeometry = new THREE.PlaneGeometry( 40, 40 ); // width , height
  var groundMaterial = new THREE.MeshPhongMaterial( { ambient: 0xffffff, 
                                                      color: 0xA35200,
                                                      specular: 0x292929 } );
  var ground = new THREE.Mesh(groundGeometry, groundMaterial);

  // NOTE: Z-Axis is flipped (forward is negative, backward is positive)
  ground.rotation.z = 0;
  ground.position.z = -5;

  ground.receiveShadow = true;

  scene.add(ground);

  // Add light

  var directionalLight = new THREE.DirectionalLight( "white", // color
                                                     0.6 ); // intensity
  directionalLight.position.set(-3, 2, 6);
  directionalLight.target.position.set(0,1,0);

  // Shadows
  directionalLight.castShadow = true;
  directionalLight.shadowDarkness = 0.5;
  directionalLight.shadowMapWidth = 1024;
  directionalLight.shadowMapHeight = 1024;

  // Debugging
  directionalLight.shadowCameraVisible = true;
  
  // Dimensions for the light box
  directionalLight.shadowCameraNear = 5;
  directionalLight.shadowCameraFar = 17;
  directionalLight.shadowCameraLeft = -3;
  directionalLight.shadowCameraRight = 3;
  directionalLight.shadowCameraTop = 3;
  directionalLight.shadowCameraBottom = -3;

  scene.add(directionalLight);

  // Add camera

  camera.position.z = 12;

  // Add mouse variable and listener function

  var xCenter = window.innerWidth / 2;
  var yCenter = window.innerHeight / 2;
  var cameraLookPoint = new THREE.Vector3(0,0,0);

  $("canvas").mousemove(function(event) {
    var xPosition = -(xCenter - (event.pageX)) / 40;
    var yPosition = (yCenter - (event.pageY)) / 40;
    var mouse = [xPosition, yPosition];
    // console.log(mouse);
    // console.log(xCenter);
    cameraLookPoint.setX(xPosition);
    cameraLookPoint.setY(yPosition);
  });



  

  // Add a render loop

  function render() {
    requestAnimationFrame(render);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // camera.position.x += 0.1;
    // camera.position.x = mouse[0];
    // camera.position.y = mouse[1];
    camera.lookAt(cameraLookPoint);

    renderer.render(scene, camera);
  }

  render();
});