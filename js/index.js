let scene = new THREE.Scene();

let Width = window.innerWidth;
let Height = window.innerHeight;

let renderer = new THREE.WebGLRenderer();
  // background color below:
renderer.setClearColor(0x121212);

renderer.setSize(Width, Height);

let camera = new THREE.PerspectiveCamera(45, Width / Height, 0.01, 10000);

let planeGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
  /* wave color below: 
      wireframe must be set to 'true' otherwise it looks ugly, try it with 'false' lol 
  */
let planeMaterial = new THREE.MeshBasicMaterial({color: 0x6D6D6D, wireframe: true});

let plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.5 * Math.PI;

// plane position duh 
plane.position.set(0, 0, 0);

scene.add(plane);

/* X, Y, Z positions for camera:
    anything past 100 is overkill
*/
camera.position.set(0, 90, 100);
camera.lookAt(scene.position);

document.body.appendChild(renderer.domElement);

/*INPUT + BUTTON*/
let chngMag = document.getElementById("chngMag");
let setMagField = document.getElementById("setMagField");
let setMag = document.getElementById("setMag");
let chngSize = document.getElementById("chngSize");
let setSizeField = document.getElementById("setSizeField");
let setSize = document.getElementById("setSize");
/**/
let size = 3.0;
let magnitude = 3;

setMag.value = magnitude;
setMag.setAttribute("placeholder", magnitude);
setSize.value = size;
setSize.setAttribute("placeholder", size);

function changeMagnitude(){
  if(!isNaN(setMag.value)){
    magnitude = setMag.value;
    setMag.setAttribute("placeholder", magnitude);
  } else if(isNaN(setMag.value)) {
    setMagField.setAttribute("class", "field error")
    setMag.setAttribute("placeholder", "Input must be an integer");
  } else if(setMag.value === "" || setMag.value === null){
    magnitude = 3;
    setMag.setAttribute("placeholder", magnitude);
    setMag.value = 3;
  }
}
function changeSize(){
  if(!isNaN(setSize.value)){
    size = setSize.value;
    setSize.setAttribute("placeholder", size);
  } else if(isNaN(setSize.value)) {
    setSizeField.setAttribute("class", "field error");
    setSize.setAttribute("placeholder", "Input must be an integer");
  } else if(setSize.value === "" || setSize.value === null) {
    size = 3;
    setSize.setAttribute("placeholder", size);
    setSize.value = 3;
  }
}
function SetValue(){
    chngMag.click();
    chngSize.click();
}
function keyUp(key){
  if(key.keyCode === 13){
    key.preventDefault();
    SetValue();
  }
}
chngMag.onclick = changeMagnitude;
chngSize.onclick = changeSize;
document.onkeyup = keyUp;

(function drawFrame(ts){
  let center = new THREE.Vector2(0,0);
  window.requestAnimationFrame(drawFrame);

  let vLength = plane.geometry.vertices.length;

  for (let i = 0; i < vLength; i++) {
    let v = plane.geometry.vertices[i];
    let dist = new THREE.Vector2(v.x, v.y).sub(center);
    /* size = size of wave
       magnitude = magnitude of wave 
    */ 

    v.z = Math.sin(dist.length()/-size + (ts/500)) * magnitude;
  }
  
  plane.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
}());
