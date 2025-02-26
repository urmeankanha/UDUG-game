let CONTAINER = document.querySelector('#container');

let CAMERA, SCENE, RENDERER;
let UNIFORMS;

let SHADERS = {
    vertexShader:   document.querySelector('#vertex-shader').textContent,
    fragmentShader: document.querySelector('#fragment-shader').textContent,
};





main();





function main() {
    init();
    animate();
}


function init() {
    initUniforms();

    CAMERA = new THREE.Camera();
    CAMERA.position.z = 1;

    SCENE = new THREE.Scene();
    SCENE.add(getMesh());

    RENDERER = new THREE.WebGLRenderer();
    RENDERER.setPixelRatio(window.devicePixelRatio);

    CONTAINER.appendChild(RENDERER.domElement);

    initEventListeners();
    onWindowResize();
}


function initUniforms() {
    UNIFORMS = {
        U_TIME: {
            type: 'f',
            value: 1.0
        },
        U_RESOLUTION: {
            type: 'v2',
            value: new THREE.Vector2()
        }
    };
}


function getShaderMaterial() {
    return new THREE.ShaderMaterial({
        uniforms:       UNIFORMS,
        vertexShader:   SHADERS.vertexShader,
        fragmentShader: SHADERS.fragmentShader
    });
}


function getMesh() {
    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const material = getShaderMaterial();

    return new THREE.Mesh(geometry, material);
}


function initEventListeners() {
    window.addEventListener('resize', onWindowResize);
}


function onWindowResize(e) {
    const size = Math.min(window.innerWidth, window.innerHeight) / 2;

    RENDERER.setSize(size, size);

    UNIFORMS.U_RESOLUTION.value.x = size;
    UNIFORMS.U_RESOLUTION.value.y = size;
}


function animate() {
    requestAnimationFrame(animate);
    render();
}


function render() {
    UNIFORMS.U_TIME.value += 0.05;

    RENDERER.render(SCENE, CAMERA);
}