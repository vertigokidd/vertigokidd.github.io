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
  directionalLight.position.set(-5, 2, 8);
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
  directionalLight.shadowCameraFar = 20;
  directionalLight.shadowCameraLeft = -10;
  directionalLight.shadowCameraRight = 10;
  directionalLight.shadowCameraTop = 10;
  directionalLight.shadowCameraBottom = -10;

  scene.add(directionalLight);

  // Add camera

  camera.position.z = 12;

  // Add mouse variable and listener function

  var xCenter = window.innerWidth / 2;
  var yCenter = window.innerHeight / 2;
  var cameraLookPoint = new THREE.Vector3(0,0,0);

  $("canvas").mousemove(function(event) {
    var xPosition = -(xCenter - (event.pageX)) / 60;
    var yPosition = (yCenter - (event.pageY)) / 60;
    var mouse = [xPosition, yPosition];
    // console.log(mouse);
    // console.log(xCenter);
    cameraLookPoint.setX(xPosition);
    cameraLookPoint.setY(yPosition);
  });


  // Create variables for circle path

  var step = -2 * Math.PI/480; // Negative to go clockwise
  var r = 6;
  var theta = 0;
  circleCoordinates = [r, 0];

  // Algorithm from: http://www.mathopenref.com/coordcirclealgorithm.html

  function createCirclePath() {
    if (theta < 2 * Math.PI) {
      theta += step;
    }
    else {
      theta = 0;
    }
    var x = (r * Math.cos(theta));
    var y = (r * Math.sin(theta));
    circleCoordinates[0] = x;
    circleCoordinates[1] = y;
    return circleCoordinates;
  }

  

  // Add a render loop

  function render() {
    requestAnimationFrame(render);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Find path coordinates
    createCirclePath();
    cube.position.x = circleCoordinates[0];
    cube.position.y = circleCoordinates[1];

    camera.lookAt(cameraLookPoint);

    renderer.render(scene, camera);
  }

  render();
});