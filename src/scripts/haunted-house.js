import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons'
import { Timer } from 'three/addons/misc/Timer.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// 坐标轴helper
const axesHelper = new THREE.AxesHelper(10)
scene.add(axesHelper)

/**
 * House
 */
const houseMeasurements = {
  width: 4,
  height: 2.5,
  depth: 4,
  roof: {
    radius: 3.5,
    height: 1.5,
    radialSegments: 4,
  },
  door: {
    width: 2.2,
    height: 2.2,
  },
}

const house = new THREE.Group()
scene.add(house)

// 墙
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(houseMeasurements.width, houseMeasurements.height, houseMeasurements.depth),
  new THREE.MeshStandardMaterial(),
)
walls.position.y = houseMeasurements.height / 2
house.add(walls)

// 屋顶
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(houseMeasurements.roof.radius, houseMeasurements.roof.height, houseMeasurements.roof.radialSegments),
  new THREE.MeshStandardMaterial(),
)
roof.position.y = houseMeasurements.height + houseMeasurements.roof.height / 2
// roof.rotation.y = Math.PI * 0.25
roof.rotateY(Math.PI * 0.25)
house.add(roof)

// 门
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(houseMeasurements.door.width, houseMeasurements.door.height),
  new THREE.MeshStandardMaterial(),
)
door.position.y = houseMeasurements.door.height / 2
door.position.z = houseMeasurements.depth / 2 + 0.01
house.add(door)

// 地板
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial(),
)
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)

// 灌木丛
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.setScalar(0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.setScalar(0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.setScalar(0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.setScalar(0.15)
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// 墓碑
const graveGeometry = new THREE.BoxGeometry(0.6, 1, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Animate
 */
const timer = new Timer()

function tick() {
  // Timer
  timer.update()
  const elapsedTime = timer.getElapsed()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
