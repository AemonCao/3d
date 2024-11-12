import * as THREE from 'three'
import { OrbitControls } from 'three/addons'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const scene = new THREE.Scene()

const material = new THREE.MeshBasicMaterial({
  color: 0xFF0000,
  wireframe: true,
})

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material,
)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material,
)

plane.position.x = -1.5

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material,
)

torus.position.x = 1.5

scene.add(sphere, plane, torus)

const group = new THREE.Group()

scene.add(group)

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

const clock = new THREE.Clock()

function tick() {
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = elapsedTime * 0.1
  plane.rotation.y = elapsedTime * 0.1
  torus.rotation.y = elapsedTime * 0.1

  sphere.rotation.x = elapsedTime * 0.15
  plane.rotation.x = elapsedTime * 0.15
  torus.rotation.x = elapsedTime * 0.15

  orbitControls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
