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

  var geometry = new THREE.BoxGeometry(5,5,5);
  var material = new THREE.MeshPhongMaterial( { color: 0x3366FF, 
                                                specular: 0x424242 } );
  var cube = new THREE.Mesh(geometry, material);

  cube.castShadow = true;

  // cube.position.y = 0.2;

  scene.add(cube); // Cube will be added to (0,0,0)

  // Add ground

  var groundGeometry = new THREE.PlaneGeometry( 40, 40 ); // width , height
  var groundMaterial = new THREE.MeshPhongMaterial( { ambient: 0xffffff, 
                                                      color: 0xA35200,
                                                      specular: 0x292929 } );
  var ground = new THREE.Mesh(groundGeometry, groundMaterial);

  // NOTE: Z-Axis is flipped (forward is negative, backward is positive)
  ground.rotation.z = 0;
  ground.position.z = -10;

  ground.receiveShadow = true;

  scene.add(ground);

  // Add light

  var directionalLight = new THREE.DirectionalLight( "white", // color
                                                     0.6 ); // intensity
  directionalLight.position.set(-3, 3, 8);
  directionalLight.target.position.set(0,0,0);

  // Shadows
  directionalLight.castShadow = true;
  directionalLight.shadowDarkness = 0.5;
  directionalLight.shadowMapWidth = 1024;
  directionalLight.shadowMapHeight = 1024;

  directionalLight.shadowCameraVisible = true;
  
  // Dimensions for the light box
  directionalLight.shadowCameraNear = -1;
  directionalLight.shadowCameraFar = 30;
  directionalLight.shadowCameraLeft = -5;
  directionalLight.shadowCameraRight = 5;
  directionalLight.shadowCameraTop = 5;
  directionalLight.shadowCameraBottom = -5;

  scene.add(directionalLight);

  // Add camera

  camera.position.z = 20;
  // camera.position.set(0,0,5);
  camera.lookAt(scene.position);

  // Add a render loop

  function render() {
    requestAnimationFrame(render);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  render();
});