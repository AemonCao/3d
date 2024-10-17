import * as THREE from 'three'
import gsap from 'gsap'

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

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

gsap.to(group.position,{
    x: 2,
    duration: 1,
    delay: 1
})

gsap.to(group.position,{
    x: -2,
    duration: 1,
    delay: 2
})

gsap.to(group.position,{
    x: 0,
    duration: 1,
    delay: 3
})

const render = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(render)
}

render()
