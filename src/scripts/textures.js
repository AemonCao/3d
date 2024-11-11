import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
import doorImage from './../assets/Door_Wood_001_SD/Door_Wood_001_basecolor.jpg'
import '../style/index.css'

const image = new Image()

const texture = new THREE.Texture(image)

image.onload = () => {
  texture.needsUpdate = true
}
image.src = doorImage

const canvas = document.querySelector('canvas.webgl')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()
const group = new THREE.Group()

scene.add(group)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
  new THREE.MeshBasicMaterial({ map: texture }),
)

group.add(cube)

// Axes helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
camera.lookAt(group.position)
scene.add(camera)

const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true
scene.add(orbitControls.object)

const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)

function render() {
  orbitControls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

render()
