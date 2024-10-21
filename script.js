import * as THREE from 'three'


const sizes = {
    width: 800,
    height: 800
}

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove',(event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    })
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
    })
)

cube2.position.x = -2

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true
    })
)

cube3.position.x = 2

group.add(cube1)
group.add(cube2)
group.add(cube3)

// Axes helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100)
// const aspectRatio = sizes.width / sizes.height
// const  camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio,-1,1,0.1,100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(group.position)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

// const clock = new THREE.Clock()

const render = () => {
    // group.rotation.y = clock.getElapsedTime()

    // 更新相机位置
    camera.position.x = cursor.x * 10
    camera.position.y = cursor.y * 10
    // camera.lookAt(new THREE.Vector3())
    camera.lookAt(group.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(render)
}

render()
