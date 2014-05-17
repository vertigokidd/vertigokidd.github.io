$(document).ready(function() {

  // To display anything, we need a scene, a camera, and a renderer

  var scene = new THREE.Scene();

  // PerspectiveCamera takes four arguments
  var camera = new THREE.PerspectiveCamera( 75, // Field of view
                                            window.innerWidth / window.innerHeight, // Aspect ratio 
                                            0.1, // near clipping
                                            1000 ); // far clipping

  camera.setLens(35, 35);

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
  // directionalLight.shadowCameraVisible = true;
  
  // Dimensions for the light box
  directionalLight.shadowCameraNear = 5;
  directionalLight.shadowCameraFar = 17;
  directionalLight.shadowCameraLeft = -3;
  directionalLight.shadowCameraRight = 3;
  directionalLight.shadowCameraTop = 3;
  directionalLight.shadowCameraBottom = -3;

  scene.add(directionalLight);

  // Add camera

  var radius = 15;

  camera.position.z = radius;

  // Add position variables

  var xCenter = window.innerWidth / 2;
  var cameraLookPoint = new THREE.Vector3(0,0,0);
  var cameraPosition = [0, radius];

  function findZPosition(num) {
    var z = Math.sqrt(Math.pow(radius, 2) - (Math.pow(num, 2)));
    if (isNaN(z)) {
      return 1;
    }
    else {
      return z;
    }
  }

  function findXPosition(num) {
    if (Math.abs(num) > radius) {
      return radius * (num / Math.abs(num));
    }
    else {
      return num;
    }
  }

  $("canvas").mousemove(function(event) {
    var xPosition = -(xCenter - (event.pageX)) / 40;
    // console.log(xPosition);
    cameraPosition[0] = findXPosition(xPosition);
    cameraPosition[1] = findZPosition(xPosition);
    // console.log(cameraPosition);
  });



  

  // Add a render loop

  function render() {
    requestAnimationFrame(render);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    camera.lookAt(cameraLookPoint);
    camera.position.x = cameraPosition[0];
    camera.position.z = cameraPosition[1];
    renderer.render(scene, camera);
  }

  render();
});