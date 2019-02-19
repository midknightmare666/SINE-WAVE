let scene = new THREE.Scene();

let Width = window.innerWidth;
let Height = window.innerHeight;

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x121212);
renderer.setSize(Width, Height);

let camera = new THREE.PerspectiveCamera(45, Width / Height, 0.01, 10000);

let planeGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
let planeMaterial = new THREE.MeshBasicMaterial({color: 0x6D6D6D, wireframe: true});
let plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.5 * Math.PI;

plane.position.set(0, 0, 0);

scene.add(plane);

camera.position.set(0, 90, 100);
camera.lookAt(scene.position);

document.body.appendChild(renderer.domElement);

(function drawFrame(ts){
  let center = new THREE.Vector2(0,0);
  window.requestAnimationFrame(drawFrame);

  let vLength = plane.geometry.vertices.length;

  for (let i = 0; i < vLength; i++) {
    let v = plane.geometry.vertices[i];
    let dist = new THREE.Vector2(v.x, v.y).sub(center);
    let size = 6.0;
    let magnitude = 5;
    v.z = Math.sin(dist.length()/-size + (ts/500)) * magnitude;
  }
  
  plane.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
}());
